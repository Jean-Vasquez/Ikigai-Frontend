import { Component } from '@angular/core';
import { productsListArray } from '../../../interfaces/productsListArray';
import { ProductsService } from '../../../services/Products.service';


@Component({
  selector: 'products-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {

  
  cartItems: any[] = [];
  constructor(private cartService: ProductsService) {}

  ngOnInit(): void {
    this.loadCart(); 
  }

  
  loadCart(): void {
    this.cartItems = this.cartService.getCart(); 
  }

  increaseQuantity(item: productsListArray){
    this.cartService.addToCart(item);
    this.loadCart(); 
  }

  decreaseQuantity(item: any){
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

  deleteProductCart(productId: string): void {
    this.cartService.clearCartID(productId);
    this.loadCart(); 
  }

  clearCart(): void {
    this.cartService.clearCart(); 
    this.loadCart(); 
  }

}
