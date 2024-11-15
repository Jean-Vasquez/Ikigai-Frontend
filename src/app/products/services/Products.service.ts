import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { productsNewArray } from '../interfaces/productsNewArray';
import { productsListArray } from '../interfaces/productsListArray';
import { v4 as uuid} from 'uuid'
@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  /* Falta interface de cart */
  private cart: any[] = [];
  
  private products: productsListArray[] = []; // Usa productsListArray para almacenar todos los detalles
  private newProducts : productsNewArray[] = [];


  constructor() {
    this.loadProducts();
    this.loadCart();  // Cargar el carrito si es necesario
  }

  /* Agrega producto seleccionado al carrito, 
  pasa como parametro un Array de un producto */
  addToCart(product: productsNewArray) {

    /* Asigna a item el resultado del find */
    const item = this.cart.find((p) => p.id === product.id);
   
    /* Si encuentra un id igual en el array del carrito,
     le suma +1 al producto del carrito*/
    if (item) {
      item.quantity++;
    } 
   
    /* Sino, agrega el nuevo producto al array del carrito*/
    else {
      this.cart.push({ ...product, quantity: 1 });
    }
    
    /* Guarda en el localStorage el carrito */
    this.saveCart();
  }

  /* Método para guardar en el localStorage */
  private saveCart(): void {
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  public getProductsAll(): Observable<productsNewArray[]> {
    // Filtra los productos para que solo devuelvan las propiedades necesarias para productsNewArray
    const newProducts: productsNewArray[] = this.products.map(p => ({
      id: p.id,
      nombre: p.nombre,
      imgUrl: p.imgUrl,
      precio: p.precio,
      categoria : p.categoria
    }));
    return of(newProducts);
  }

  /* Mapeamos el arreglo original de productos, para obtener todos los 
  id, nombre, img, categoria, precio, para asignarlos al otro arreglo
  de newProducts */
  public getProductsNew():Observable<productsNewArray[]>{
    const newProducts:productsNewArray[] = this.products.map( i =>({
      id: i.id,
      nombre: i.nombre,
      imgUrl: i.imgUrl,
      categoria: i.categoria,
      precio: i.precio
    }))


    /* Modificamos el arreglo de newProducts en reversa y 
    solo obtenemos los 5 primeros elementos */
    const limitedProducts = newProducts.reverse().slice(0, 5);

    /* Retornamos al observable el nuevo arreglo con limite 5 */
    return of(limitedProducts);
  }
  
 /* Permite mostrar el producto seleccionado */
  public getProducId(item : string): productsListArray {
    const selectProduct = this.products.findIndex(product => product.id === item)
      
       return this.products[selectProduct]

  }


  /* Retorna la lista de Productos */
  public getProducts(): productsListArray[] {
    return this.products;
  }
  

  /* Añade un nuevo producto a la lista de productos y 
  guarda el localStorage */
  addProduct(product: productsListArray): void {
    this.products.push(product);
    this.saveProducts();
  }

  /* Guarda productos en localStorage*/
  private saveProducts(): void {
    localStorage.setItem('productos', JSON.stringify(this.products));
  }


  private loadProducts(): void {
    const savedProducts = localStorage.getItem('productos');
    if (savedProducts) {
      this.products = JSON.parse(savedProducts) as productsListArray[];
    } else {
      // Aquí puedes agregar productos predeterminados si es necesario
      this.products = [
        { id: '1', nombre: 'Goku Niño sentado en nube voladora', imgUrl: 'images/Goku_niño.jpg', precio: 30.00, categoria: 'Anime', descripcion: 'Descripción de Goku Niño', presentacion: 'Figura', stock: 10 },
        { id: '2', nombre: 'Goku Niño', imgUrl: 'images/Goku_niño.jpg', precio: 30.00, categoria: 'Anime', descripcion: 'Descripción de Goku Niño', presentacion: 'Figura', stock: 10 },
        // Agrega más productos si es necesario
      ];
      this.saveProducts();
    }
  }

  /* De acuerdo al id del parametro, filtra el producto y 
  lo guarda el localStorage */
  removeProduct(productId: string): void {
    this.products = this.products.filter(product => product.id !== productId);
    this.saveProducts();
  }

  /*De acuerdo al id del producto, busca para modificar el que
  tenga el mismo id, y luego guarda en el localStorage */
  updateProduct(updatedProduct: productsListArray): void {
    const index = this.products.findIndex(product => product.id === updatedProduct.id);
    if (index !== -1) {
      this.products[index] = updatedProduct;
      this.saveProducts();
    }
  }

  /* Obtiene la array cart */
  public getCart(): any[] {
    return this.cart;
  }

  /* Limpia el array cart y lo guarda en el localStorage */
  clearCart(): void {
    this.cart = [];
    this.saveCart();
  }

  /* Actualiza el array, asignando el valor que se le pase
  por el parametro y luego guarda en el localStorage los cambios */
  updateCart(cart: any[]): void {
    this.cart = cart;
    this.saveCart();
  }

  /* Borra producto del carrito */
   clearCartID(item: string ): void{
    this.cart = this.cart.filter(cartArray => cartArray.id !== item)
    this.saveCart()
  }

  /* Busca el item cart del localStorage, 
  agisna al array del carrito, savedCart, que puede estar vacío
  o puede obtener el JSON del localStorage*/
  private loadCart(): void {
    const savedCart = localStorage.getItem('cart');
    this.cart = savedCart ? JSON.parse(savedCart) : [];
  }



/* -------------------AGREGAR PRODUCTOS NUEVOS---------------------- */
  public agregarProductos(producto: productsListArray){

    const NuevoProducto: productsListArray =  {
      id: uuid(),
      nombre:       producto.nombre,
      categoria:    producto.categoria,
      descripcion:  producto.descripcion,
      imgUrl :      producto.imgUrl,
      precio:       producto.precio,
      presentacion: producto.presentacion,
      stock:        producto.stock
        
    }
  
    try {
      if(this.products.push(NuevoProducto)){
        this.guardarProductoStorage()
      }
    } catch (error) {
      console.log(`Error en agregarProductos: ${error}`)
    }

  }

  public guardarProductoStorage(){
    localStorage.setItem('productos', JSON.stringify(this.products))
  }


  public obtenerPorductos(){
    return this.products
  }


/* -------------------AGREGAR PRODUCTOS NUEVOS---------------------- */



/* FALTA PAGINACION, BUSQUEDA  */

}
