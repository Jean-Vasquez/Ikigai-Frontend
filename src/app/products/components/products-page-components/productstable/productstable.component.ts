import { Component, OnInit } from '@angular/core';
import { productsListArray } from '../../../interfaces/productsListArray';
import { ProductsService } from '../../../services/Products.service';
@Component({
  selector: 'products-productstable',
  templateUrl: './productstable.component.html',
  styleUrl: './productstable.component.css'
})
export class ProductstableComponent implements OnInit {
  products: productsListArray[] = [];
  isEditing: boolean = false;  
  selectedProduct: productsListArray | null = null;

  constructor(private productsService: ProductsService) { }

  ngOnInit(): void {
    this.productsService.getProducts().subscribe(
      (data) => {
        this.products = data; //asignar productos a la lista
      }, (error) => {
        console.error('Error al obtener productos:', error)
      }
    );
  }

  async confirmDelete(productId: string): Promise<void> {
    const confirmed = confirm('¿Estás seguro de que deseas eliminar este producto?');
    if (confirmed) {
      await this.deleteProduct(productId);
    }
  }

  async deleteProduct(productId: string): Promise<void> {
    const confirmed = confirm('¿Estás seguro de que deseas eliminar este producto?');
    if (!confirmed) return;

    try {
      await this.productsService.deleteProduct(productId).toPromise();
      this.products = this.products.filter((product) => product._id !== productId);
      alert('Producto eliminado exitosamente.');
    } catch (error) {
      console.error('Error al eliminar producto:', error);
      alert('No se pudo eliminar el producto. Intenta de nuevo.');
    }
  }

  editProduct(product: productsListArray): void {
    this.isEditing = true;
    this.selectedProduct = { ...product }; //crear una copia para edición
    
  } 
}
