import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLinkActive } from '@angular/router';
import { ProductsService } from '../../services/Products.service';
import { respuestaProductos } from '../../interfaces/respuestaProductos';
import { Producto } from '../../interfaces/response/respuesta-productos.interface';
import { productoDetalle } from '../../interfaces/response/respuesta-detalle.interface';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent implements OnInit {
  product: any;

  public products : productoDetalle[] = []
  private productsService = inject(ProductsService)
  private id: string =''
  constructor(private route: ActivatedRoute){
    
    this.route.params.subscribe(params => this.id = params['id'] )
  }

  ngOnInit(): void {
    this.getProductosId(this.id)
  }


  getProductosId(id:string){
    this.productsService.getProductById(id).subscribe({
      next: (product) => this.products.push(product)
    })
  }


  comprarProducto(id: string){
    this.productsService.compraProd(id)
  }



}


