import { Component, OnInit } from '@angular/core';
import { productsListArray } from '../../../interfaces/productsListArray';
import { ProductsService } from '../../../services/Products.service';
import { v4 as uuid} from 'uuid'
@Component({
  selector: 'products-productstable',
  templateUrl: './productstable.component.html',
  styleUrl: './productstable.component.css'
})
export class ProductstableComponent implements OnInit {
  isEditing: boolean = false;
  products : productsListArray[] = [];
  newproducts: productsListArray=
  {
    id:uuid(),
    nombre: '',
    imgUrl: '',
    categoria: '',
    descripcion: '',
    presentacion: '',
    precio: 0, 
    stock: 0
}

  constructor(private productsService: ProductsService){}

  ngOnInit(): void {
    this.productsService.getProducts().subscribe(
      (data) => {
        this.products = data; //asignar productos a la lista
      },(error) => {
        console.error('Error al obtener productos:',error)
      }
    );
  }

  deleteProduct(productId:string):void{
    //eliminar el producto a traves del service
    this.productsService.deleteProduct(productId).subscribe(
      () => {
        //Actualizar la lista de productos después de eliminar
        this.products = this.products.filter(product => product.id !== productId);
      }, (error) => {
        console.error('Error al eliminar producto:',error)
      }
    );
  }
  

  editProduct(product: productsListArray): void {
    this.newproducts = { ...product }; //crear una copia para edición
    this.isEditing = true;
  }
}
