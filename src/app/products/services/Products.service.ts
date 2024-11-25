import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { productsNewArray } from '../interfaces/productsNewArray';
import { productsListArray } from '../interfaces/productsListArray';
import { v4 as uuid} from 'uuid'
import { environment } from '../../../environments/environments';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  /* Falta interface de cart */
  private cart: any[] = [];
  
  private products: productsListArray[] = []; // Usa productsListArray para almacenar todos los detalles
  
  private baseUrl = `${environment.baseURL}/producto`; //url para conexion con la bd

  constructor(private http: HttpClient) {
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

  // Obtener todos los productos
  getProducts(): Observable<productsListArray[]> {
    return this.http.get<productsListArray[]>(this.baseUrl);
  }
  

   // Crear un nuevo producto
   addProduct(product: productsListArray): Observable<productsListArray> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' }); // Configurar header
  
    return this.http.post<productsListArray>(this.baseUrl, product)
  }

  // Obtener producto por ID
  getProductById(term: string): Observable<productsListArray> {
    return this.http.get<productsListArray>(`${this.baseUrl}/${term}`);
  }


  private loadProducts(): void {
    this.getProducts().subscribe(
      (products) =>{
        this.products = products;
      }, (error) => {
        console.error('Error al cargar los productos desde el servidor', error);
      }
    );
  }

   // Eliminar un producto por ID
   deleteProduct(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  // Actualizar un producto
  updateProduct(term: string, product: productsListArray): Observable<productsListArray> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.patch<productsListArray>(`${this.baseUrl}/${term}`, product);
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
