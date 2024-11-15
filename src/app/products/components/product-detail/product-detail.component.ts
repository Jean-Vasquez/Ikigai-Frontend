import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from '../../services/Products.service';
import { productsListArray } from '../../interfaces/productsListArray';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent  {
  product: any;

  public products : productsListArray[] = []

  constructor(private router: Router, private productService:ProductsService) {
    const navigation = this.router.getCurrentNavigation();
    this.product = navigation?.extras.state?.['product'];
  }  



  public getProduct(item: string){

   const i = this.productService.getProducId(item)
   this.products.push(i)
}








}

