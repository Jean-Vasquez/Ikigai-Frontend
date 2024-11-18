import { Component } from '@angular/core';
import { productsListArray } from '../../../interfaces/productsListArray';
import { v4 as uuid} from 'uuid'
import { ProductsService } from '../../../services/Products.service';

@Component({
  selector: 'products-productform',
  templateUrl: './productform.component.html',
  styleUrl: './productform.component.css'
})

export class ProductformComponent {

  constructor(private productsService:ProductsService){}
  
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
  products : productsListArray[] = []
  isEditing: boolean = false;

  addProduct(){
      
    if(this.newproducts.nombre.length > 0 && 
      this.newproducts.imgUrl.length > 0 &&
      this.newproducts.precio > 0 &&
      this.newproducts.stock > 0
    ){
    if (this.isEditing) {
      this.productsService.updateProduct(this.newproducts);
      this.resetForm()
    }else{
    this.productsService.addProduct(this.newproducts)
    this.products = this.productsService.getProducts()
    this.resetForm()
    }}

  }

 


  resetForm(){
    this.newproducts = {
      id: uuid(),
      nombre: '',
      imgUrl: '',
      categoria: '',
      descripcion: '',
      presentacion: '',
      precio: 0,
      stock: 0
      
    }
    this.isEditing = false;
  } 
}
