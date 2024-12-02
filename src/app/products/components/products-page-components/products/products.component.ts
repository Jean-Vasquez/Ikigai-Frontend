import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../services/Products.service';
import { productsNewArray } from '../../../interfaces/productsNewArray';
import { Router} from '@angular/router';
import { NewProduts } from '../../../interfaces/new-product';

@Component({
  selector: 'products-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  
  
  products: NewProduts[] = [];
  cartItems: any[] = [];
  selectedProduct: productsNewArray | null = null;
  constructor(private productsService: ProductsService, private router:Router){}

  ngOnInit(): void {
  }

  async loadProductos() {
    console.log('cd')
    try {
      // Llama al servicio y espera la resolución de la promesa
      const p = await this.productsService.newAllProducts();
      console.log(p); // Verifica si los productos llegan al componente
    } catch (error) {
      console.error('Error loading products:', error);  // Manejo de errores
    }
  }


}
