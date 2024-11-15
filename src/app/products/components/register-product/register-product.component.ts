import { Component, OnInit } from '@angular/core';
import { productsListArray } from '../../interfaces/productsListArray';
import { ProductsService } from '../../services/Products.service';
import { v4 as uuid} from 'uuid'
@Component({
  selector: 'app-register-product',
  templateUrl: './register-product.component.html',
  styleUrl: './register-product.component.css'
})
export class RegisterProductComponent{

constructor(private productsService:ProductsService){
}

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
  
  isEditing: boolean = false;

    ngOnInit(){
      this.products = this.productsService.getProducts()
    }

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

    removeProduct(productId:string):void{
      this.productsService.removeProduct(productId)
      this.products = this.productsService.getProducts()
    }
    

    editProduct(product: productsListArray) {
      this.newproducts = { ...product }; 
      this.isEditing = true;
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
