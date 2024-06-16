import { Component, inject } from '@angular/core';
import {ProductoComponent} from "../../elementos/producto/producto.component";
import { Product } from '../../interfaces/product';
import { ProductoService } from '../../servicios/producto.service';


@Component({
  selector: 'app-tienda', 
  standalone: true, 
  imports: [ProductoComponent],
  templateUrl: './tienda.component.html', 
  styleUrl: './tienda.component.scss'
})

export class TiendaComponent {
  title = ''
  listaDeProductos: Product[] = []; 
  productoService: ProductoService =
  inject(ProductoService); 
  constructor() {
  //this.listaDeProductos = this.productoService.obtenerTodosLosProductos();
  
  }
  ngOnInit(): void{
    this.productoService.obtenerTodosLosProductos().subscribe(
      data => {this.listaDeProductos = data;
      this.listaDeProductos.forEach((a: Product) => {
      Object.assign(a, {cantidad:1, total: a.price});
        });
      } 
    ) 
  } 
}
