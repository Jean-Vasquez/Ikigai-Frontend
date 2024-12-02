import { Component, OnInit } from '@angular/core';
import { respuestaProductos } from '../../../interfaces/respuestaProductos';
import { ProductsService } from '../../../services/Products.service';
import { Router } from '@angular/router';

declare var bootstrap: any;

@Component({
  selector: 'products-productstable',
  templateUrl: './productstable.component.html',
  styleUrl: './productstable.component.css'
})
export class ProductstableComponent implements OnInit {
 public products: respuestaProductos[] = [];
  public productoSelect:respuestaProductos = {_id:'',nombre: '',imagen: '',categoria: '',
    descripcion: '',precio: 0,stock: 0}

  public resProductos: respuestaProductos[] = []
  constructor(private productsService: ProductsService, private router: Router) { 
    
  }

  ngOnInit() {
    this.listarProducts();
  }

  listarProducts(){
    this.productsService.getProducts().subscribe(
      (resp) => {
        this.products = resp.productos
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
    } catch (error) {
      console.error('Error al eliminar producto:', error);
      alert('No se pudo eliminar el producto. Intenta de nuevo.');
    }
  }


  editarProduc(product: respuestaProductos) {
    this.productoSelect = {...product};
  }

  async Actulizar() {
    if(this.productoSelect._id){
      await this.productsService.updateProducto(this.productoSelect._id, this.productoSelect);
      window.location.reload();
    }
  }

}
