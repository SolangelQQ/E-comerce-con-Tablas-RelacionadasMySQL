import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  public carritoList: Product[] = []
  public productList = new BehaviorSubject<Product[]>([]);

  constructor() { 
  }
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
}
