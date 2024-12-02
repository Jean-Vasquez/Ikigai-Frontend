import { Component } from '@angular/core';
import { NewProduts } from '../../../products/interfaces/new-product';
import { ProductsService } from '../../../products/services/Products.service';

@Component({
  selector: 'home-explorer-product',
  templateUrl: './explorer-product.component.html',
  styleUrl: './explorer-product.component.css'
})
export class ExplorerCategoriesComponent {

  products: NewProduts[] = [];
  constructor(private productsService: ProductsService){}

  ngOnInit(): void {
    this.loadProductos();
  }
  
  async loadProductos() {
    const products = await this.productsService.newAllProducts();
    this.products = products ?? [];
  }

}
