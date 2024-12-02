import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from '../../services/Products.service';
import { respuestaProductos } from '../../interfaces/respuestaProductos';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent  {
  product: any;

  public products : respuestaProductos[] = []

  constructor(private router: Router, private productService:ProductsService) {
    const navigation = this.router.getCurrentNavigation();
    this.product = navigation?.extras.state?.['product'];
  }  



}


