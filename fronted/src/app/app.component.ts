import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CarritoService } from './servicios/carrito.service';
import { provideHttpClient, withFetch } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink,
    RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  
})
export class AppComponent implements OnInit{
  title = 'mi-tienda';
  public totalProducto: number=0;
  constructor(private carritoService: CarritoService){}

  ngOnInit(): void {
      this.carritoService.obtenerProductos().subscribe(res=>{
        this.totalProducto = res.length;
      })
  }
}
