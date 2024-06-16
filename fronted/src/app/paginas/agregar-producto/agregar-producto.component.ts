import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductoService } from '../../servicios/producto.service';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-agregar-producto',
  standalone: true,
  imports: [ReactiveFormsModule ],
  templateUrl: './agregar-producto.component.html',
  styleUrl: './agregar-producto.component.scss'
})
export class AgregarProductoComponent {
  productForm: FormGroup;

  constructor(private fb: FormBuilder, private productoService: ProductoService) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]]
    });
  }

  onSubmit() {
    if (this.productForm.valid) {
      this.productoService.agregarProducto(this.productForm.value).subscribe(res => {
        console.log('Producto agregado:', res);
        this.productForm.reset();
      });
    }
  }
}
