import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsModule } from '../products/products.module';
import { RouterModule } from '@angular/router';

import { MainComponent } from './pages/main.component';
import { CarrouselComponent } from './components/Carrousel/carrousel.component';
import { ExplorerProductComponent } from './components/explorer-categories/explorer-categories.component';
import { ExplorerCategoriesComponent } from './components/explorer-product/explorer-product.component';





@NgModule({
  declarations: [
    MainComponent,
    CarrouselComponent,
    ExplorerProductComponent,
    ExplorerCategoriesComponent
  ],
  imports: [
    CommonModule,
    ProductsModule,
    RouterModule
  ],exports:[
    MainComponent,
    CarrouselComponent,
    ExplorerProductComponent,
    ExplorerCategoriesComponent
  ]
})
export class HomeModule { }
