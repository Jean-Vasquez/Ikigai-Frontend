import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../products/services/Products.service';
import { productsNewArray } from '../../products/interfaces/productsNewArray';



@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements OnInit{

  products: productsNewArray[] = []

  constructor(private productsService: ProductsService){

  }

  ngOnInit(): void {
    this.productsService.getProductsNew().subscribe(data =>{
      this.products = data
    })
  }
}
