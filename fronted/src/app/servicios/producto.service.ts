import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product';
import { HttpClient } from '@angular/common/http';
import {Observable, map} from "rxjs";
import { OnInit } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  url = 'https://fakestoreapi.com/products';
  constructor( private http: HttpClient ){}

  agregarProducto(product: Product){
    return this.http.post<Product>(this.url, product);
  }
   
  obtenerTodosLosProductos(): Observable<Product[]>{ 
    return this.http.get<Product[]>(this.url).pipe(
      map(productos => productos)  
    )
  }
  obtenerProductoPorId(id: number){
    return this.http.get<Product>(this.url+'/'+id) 
  }
  submitApplication(firstName: string, lastName: string, email: string) {
    // tslint:disable-next-line
    console.log(firstName, lastName, email);
  }
  // ngOnInit(): void {
  //     this.
  // }
}
