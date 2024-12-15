import { Component, Output } from '@angular/core';
import { NewProduts } from '../../../products/interfaces/new-product';
import { ProductsService } from '../../../products/services/Products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'home-explorer-product',
  templateUrl: './explorer-product.component.html',
  styleUrl: './explorer-product.component.css'
})
export class ExplorerCategoriesComponent {

  products: NewProduts[] = [];
  constructor(private productsService: ProductsService, private router : Router){}




  ngOnInit(): void {
    this.loadProductos();
  }
  
  async loadProductos() {
    const products = await this.productsService.newAllProducts();
    this.products = products ?? [];
  }

  getProductosId(id: string){

    const ruta = `/products/product-detail/${id}`
    this.router.navigateByUrl(ruta)
  }
  


}
