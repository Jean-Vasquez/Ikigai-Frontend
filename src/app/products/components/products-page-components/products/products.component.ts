import { Component } from '@angular/core';
import { ProductsService } from '../../../services/Products.service';
import { productsNewArray } from '../../../interfaces/productsNewArray';
import { Router} from '@angular/router';

@Component({
  selector: 'products-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  
  
  products: productsNewArray[] = [];
  cartItems: any[] = [];
  selectedProduct: productsNewArray | null = null;
  constructor(private productsService: ProductsService, private router:Router){}


  selectProduct(product: productsNewArray): void {
    this.selectedProduct = product;
  }


  loadCart(){
    this.cartItems = this.productsService.getCart();
  }
  addToCart(product: productsNewArray): void {
    this.productsService.addToCart(product);
    this.loadCart();
  }

  verDetalles(product: productsNewArray): void {
    this.router.navigate(['/detalle-producto'], { state: { product } });
  }


}
