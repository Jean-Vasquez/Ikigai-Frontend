import { Component } from '@angular/core';
import { productsListArray } from '../../../interfaces/productsListArray';
import { ProductsService } from '../../../services/Products.service';
import { v4 as uuid} from 'uuid'
@Component({
  selector: 'products-productstable',
  templateUrl: './productstable.component.html',
  styleUrl: './productstable.component.css'
})
export class ProductstableComponent {

  constructor(private productsService:ProductsService){}
  isEditing: boolean = false;
  products : productsListArray[] = []
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

  ngOnInit(){
    this.products = this.productsService.getProducts()
  }

  removeProduct(productId:string):void{
    this.productsService.removeProduct(productId)
    this.products = this.productsService.getProducts()
  }
  

  editProduct(product: productsListArray) {
    this.newproducts = { ...product }; 
    this.isEditing = true;
  }
}
