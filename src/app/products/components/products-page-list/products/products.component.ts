import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../../services/Products.service';
import { productsNewArray } from '../../../interfaces/productsNewArray';
import { Router} from '@angular/router';
import { NewProduts } from '../../../interfaces/new-product';
import { AuthService } from '../../../../auth/services/Auth.service';
import { Producto,  respuestaProductosCliente } from '../../../interfaces/response/respuesta-productos.interface';
import { throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { datosCarrito } from '../../../interfaces/data/datos-carrito.interface';

@Component({
  selector: 'products-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent  {
  
  public productos : Producto[] = []
  public cartItems : datosCarrito[] = []

  public carrito : datosCarrito = {
    _id: '',
    cantidad: 0,
    imagen: '',
    nombre: '',
    precio: 0,
    stock: 0
  }


  constructor(){
    this.getProductos()
    
  }


  private productService = inject(ProductsService)

  getProductos(){
    
    this.productService.getProductsCliente().subscribe({
      next: (value) => {
        this.productos = value.productos
      },
      error: (err) =>{
        Swal.fire('Error', err, 'error')
      },
    })
  }

  private route = inject(Router)
  getProductosId(id: string){

    const ruta = `/products/product-detail/${id}`
    this.route.navigateByUrl(ruta)
  }



  agregarCarrito(data: Producto){
    const {_id,imagen,nombre,precio, stock} = data

      this.carrito = {
      _id: _id,
      imagen: imagen,
      cantidad: 1,
      precio: precio,
      nombre: nombre,
      stock: +stock
    }
    this.productService.agregarCarrito(this.carrito)
   
  }

  cargarCarritos(){
   this.cartItems = this.productService.getCartItems()
  }

  
 
}
