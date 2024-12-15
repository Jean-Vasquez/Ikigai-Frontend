import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../products/services/Products.service';
import { productsNewArray } from '../../products/interfaces/productsNewArray';
import { Route, Router } from '@angular/router';



@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

  products: productsNewArray[] = []

  constructor(private productsService: ProductsService, ){

  }

  
  
}
