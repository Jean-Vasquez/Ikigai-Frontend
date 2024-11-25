import { Component, OnInit } from '@angular/core';
import { productsListArray } from '../../../interfaces/productsListArray';
import { v4 as uuid } from 'uuid'
import { ProductsService } from '../../../services/Products.service';

@Component({
  selector: 'products-productform',
  templateUrl: './productform.component.html',
  styleUrl: './productform.component.css'
})

export class ProductformComponent implements OnInit {
  newproducts: productsListArray =
    {
      id: uuid(),      
      nombre: '',
      imgUrl: '',
      categoria: '',
      descripcion: '',
      presentacion: '',
      precio: 0,
      stock: 0
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

  //crear o actualizar un productoo
  addProduct(): void {
    this.newproducts.precio = +this.newproducts.precio; // Convertir a número
    this.newproducts.stock = +this.newproducts.stock;

    
    if (
      this.newproducts.nombre.length > 0 &&
      this.newproducts.imgUrl.length > 0 &&
      this.newproducts.precio > 0 &&
      this.newproducts.stock > 0
    ) {
      if (this.isEditing && this.editingId) {
        //actualizaar producto
        this.productsService
          .updateProduct(this.editingId, this.newproducts)
          .subscribe(() => {
            this.loadProducts(); // Recarga la lista de productos
            this.resetForm();
          });
      } else {
        //crear producto
        this.productsService.addProduct(this.newproducts).subscribe(() => {
          this.loadProducts(); // Recargar la lista de productos
          this.resetForm();
        });
      }
    }
  }

  // Eliminar un producto
  deleteProduct(id: string): void {
    this.productsService.deleteProduct(id).subscribe(() => {
      this.loadProducts(); // Recargar la lista de productos
    });
  }

  resetForm(): void {
    this.newproducts = {
      id: uuid(),
      nombre: '',
      imgUrl: '',
      categoria: '',
      descripcion: '',
      presentacion: '',
      precio: 0,
      stock: 0
    };
    this.isEditing = false;
    this.editingId = null;
  }
}
