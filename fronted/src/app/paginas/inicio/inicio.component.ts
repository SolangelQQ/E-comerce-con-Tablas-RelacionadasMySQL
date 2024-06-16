import { Component, inject } from '@angular/core';
import { AutenticacionService } from '../../servicios/autenticacion.service';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '../login/login.component';
import { RouterLink } from '@angular/router';
import { ProductoComponent } from '../../elementos/producto/producto.component';
import { Product } from '../../interfaces/product';
import { ProductoService } from '../../servicios/producto.service';
@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [ CommonModule, LoginComponent, RouterLink, ProductoComponent],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.scss'
})
export class InicioComponent {
  listaDeProductos: Product[] = []; 
  productoService: ProductoService =
  inject(ProductoService); 
  constructor(public autenticacionService: AutenticacionService) { }

  logout() {
    this.autenticacionService.logout();
  }
  trackById(index: number, item: any) {
    return item.id;
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
