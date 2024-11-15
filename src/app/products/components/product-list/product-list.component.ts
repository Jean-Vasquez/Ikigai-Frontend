import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/Products.service';
import { Router } from '@angular/router';
import { productsNewArray } from '../../interfaces/productsNewArray'; 
import { productsListArray } from '../../interfaces/productsListArray';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: productsNewArray[] = [];
  cartItems: any[] = [];
  selectedProduct: productsNewArray | null = null;

  constructor(private cartService: ProductsService, private router: Router) {
  }

  ngOnInit(): void {
    this.loadProducts();
    this.loadCart();
  }

  loadProducts(): void {
    this.cartService.getProductsAll().subscribe(products => {
      this.products = products;
    });
  }

  addToCart(product: productsNewArray): void {
    this.cartService.addToCart(product);
    this.loadCart();
  }

  loadCart(){
    this.cartItems = this.cartService.getCart();
  }

  clearCart(){
    this.cartService.clearCart();
    this.loadCart();
  }

  selectProduct(product: productsNewArray): void {
    this.selectedProduct = product;
  }

  increaseQuantity(item: productsListArray): void {
    this.cartService.addToCart(item);
    this.loadCart();
  }

  decreaseQuantity(item: any): void {
    const cart = this.cartService.getCart();
    const productIndex = cart.findIndex(p => p.id === item.id);
    if (productIndex !== -1) {
      if (cart[productIndex].quantity > 1) {
        cart[productIndex].quantity--;
      } else {
        cart.splice(productIndex, 1);
      }
      this.cartService.updateCart(cart);
      this.loadCart();
    }
  }

  verDetalles(product: productsNewArray): void {
    this.router.navigate(['/detalle-producto'], { state: { product } });
  }

  deleteProductCart(item: string):void{
    this.cartService.clearCartID(item)
    this.loadCart()
  }

   selectProductID(item: string){
    this.cartService.getProducId(item)
  }
 

}
