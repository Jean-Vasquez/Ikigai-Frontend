import { Component, OnInit } from '@angular/core';
import { productsListArray, ProductWithoutId } from '../../../interfaces/productsListArray';
import { ProductsService } from '../../../services/Products.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'products-productform',
  templateUrl: './productform.component.html',
  styleUrls: ['./productform.component.css']
})

export class ProductformComponent implements OnInit {
  
  newproducts: productsListArray =
    {
      _id: '',
      nombre: '',
      imagen: '',
      categoria: '',
      descripcion: '',
      presentacion: '',
      precio: 0,
      stock: 0,
    }
    
  products: productsListArray[] = [];
  isEditing: boolean = false;
  editingId: string | null = null; //Para almacenar el ID del producto en edición

  constructor(private productsService: ProductsService) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  // Cargar todos los productos al iniciar
  loadProducts(): void {
    this.productsService.getProducts().subscribe((data) => {
      this.products = data; //asigna los productos traidos del backendd
    });
  }

  addProduct() {
    console.log('Datos enviados:', this.newproducts); // Verifica los datos antes de enviarlos
  
    // Excluir _id antes de enviar el producto al servicio
    const { _id, ...productToSend } = this.newproducts;
  
    this.productsService.addProduct(productToSend as ProductWithoutId).subscribe(
      (respuesta) => {
        console.log("Producto registrado:", respuesta);
        this.products.push(respuesta); // Agregar a la lista local
        alert("Producto registrado exitosamente");
        this.resetForm(); // Limpiar formulario
      },
      (error) => {
        console.error("Error al registrar el producto:", error);
        alert(`Error: ${error.error.message || 'No se pudo registrar el producto'}`);
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
    try {
      await this.productsService.deleteProduct(productId).toPromise();
      this.products = this.products.filter(product => product._id !== productId);
      alert('Producto eliminado con éxito');
    } catch (error) {
      console.error('Error al eliminar producto:', error);
      alert('No se pudo eliminar el producto');
    }
  }

  updateProduct(): void {
    if (!this.editingId) {
      console.error('No hay un producto válido para actualizar.');
      return;
    }
  
    this.productsService.updateProduct(this.editingId, this.newproducts).subscribe(
      (updatedProduct) => {
        console.log('Producto actualizado:', updatedProduct);
  
        // Actualiza el producto en la lista local
        const index = this.products.findIndex(product => product._id === this.editingId);
        if (index !== -1) {
          this.products[index] = updatedProduct;
        }
  
        alert('Producto actualizado exitosamente');
        this.resetForm(); // Salir del modo de edición
      },
      (error) => {
        console.error('Error al actualizar el producto:', error);
        alert('No se pudo actualizar el producto.');
      }
    );
  }
  
  
  editProduct(product: productsListArray): void {
    this.newproducts = { ...product }; // Copia los datos del producto al formulario
    this.isEditing = true; // Cambia el modo a edición
    this.editingId = product._id; // Guarda el ID del producto en edición
  }
  


  resetForm(): void {
    this.newproducts = {
      _id: '',
      nombre: '',
      imagen: '',
      categoria: '',
      descripcion: '',
      presentacion: '',
      precio: 0,
      stock: 0,
    };
    this.isEditing = false;
    this.editingId = null;
  }
}
