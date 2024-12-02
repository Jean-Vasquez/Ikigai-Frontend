import { Component, OnInit } from '@angular/core';
import { respuestaProductos } from '../../../interfaces/respuestaProductos';
import { ProductsService } from '../../../services/Products.service';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { datosProductos } from '../../../interfaces/datos-productos.interface';
@Component({
  selector: 'products-productform',
  templateUrl: './productform.component.html',
  styleUrls: ['./productform.component.css']
})

export class ProductformComponent {
  
  newproducts: datosProductos =
    {
      nombre: '',
      imagen: '',
      categoria: '',
      descripcion: '',
      precio: 0,
      stock: 0,
    }
    
  products: respuestaProductos[] = [];

  constructor(private productsService: ProductsService, private route: ActivatedRoute, private router: Router) { 
    this.loadProducts()
  }

  // Cargar todos los productos al iniciar
  loadProducts(): void {
    this.productsService.getProducts().subscribe((data) => {
      this.products = data.productos; //asigna los productos traidos del backendd
    });
  }

  addProduct() {
    console.log('Datos enviados:', this.newproducts); // Verifica los datos antes de enviarlos
  
    // Excluir _id antes de enviar el producto al servicio
    const { ...rest } = this.newproducts;
  
    this.productsService.addProduct(rest).subscribe(
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
 

  async deleteProduct(productId: string): Promise<void> {
    try {
      await this.productsService.deleteProduct(productId).toPromise();
      this.products = this.products.filter(product => product._id !== productId);
    } catch (error) {
      console.error('Error al eliminar producto:', error);
      alert('No se pudo eliminar el producto');
    }
  }


  resetForm(): void {
    this.router.navigate(['/products/add-product']);
    this.newproducts = {
      
      nombre: '',
      imagen: '',
      categoria: '',
      descripcion: '',
      precio: 0,
      stock: 0,
    };
  }
}
