import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  
  public carritoList: Product[] = []
  public productList = new BehaviorSubject<Product[]>([]);

  constructor(private http: HttpClient) { }

  obtenerProductos(){
    return this.productList.asObservable();
  }

  setProducto(Producto: Product[]){
    this.carritoList.push(...Producto);
    this.productList.next(Producto);
  }

  addToCart(Producto: Product) {
    this.carritoList.push(Producto);
    this.productList.next(this.carritoList);
    this.getPrecioTotal();
    console.log(this.carritoList)
  }
  getPrecioTotal(): number{
    let Total = 0;
    this.carritoList.map((a:any)=>{
      Total += a.total;
    })
    return Total;
  }
  removerProductoDeCarrito(Product: any){
    this.carritoList.map((a:any, index:any)=>{
      if(Product.id === a.id){
        this.carritoList.splice(index, 1);
      }
    })
    this.productList.next(this.carritoList);
  }
  vaciarCarrito(){
    this.carritoList = []
    this.productList.next(this.carritoList);
    
  }

  comprar(date: string) {
    const products = this.carritoList.map(product => ({
      productId: product.id,
      quantity: 1
    }));

    return this.http.post('/api/carts', date );
  }
}
