import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Product } from '../../models/product';

@Component({
  selector: 'app-form-product',
  templateUrl: './form-product.component.html',
  styleUrls: ['./form-product.component.css']
})
export class FormProductComponent implements OnInit {
  @Input() product?: Product;
  @Output() saveProduct = new EventEmitter<Product>();
  @Output() cancelForm = new EventEmitter<void>(); // Cambiamos el nombre del evento
  showForm: boolean = false;

  productForm!: FormGroup; // Usamos "!" para indicar que será inicializada en el constructor
  
  constructor(private fb: FormBuilder) { }

  showUpdateForm(product: Product) {
    this.product = product;
    this.showForm = true; // Mostrar el formulario al hacer clic en "Actualizar"
  }

  ngOnInit(): void {
    this.productForm = this.fb.group({
      title: [''],
      description: [''],
      price: [''],
      category: [''],
      image: ['']
    });

    if (this.product) {
      this.productForm.patchValue(this.product);
    }
  }

  save() {
    // Lógica para guardar el formulario
    if (this.product) {
      const productsLocal: Product[] = JSON.parse(localStorage.getItem('products') || '[]');
      const index = productsLocal.findIndex((p: Product) => p.id === this.product?.id);
      if (index !== -1) {
        productsLocal[index] = this.product;
        localStorage.setItem('products', JSON.stringify(productsLocal));
        this.showForm = false; // Ocultar el formulario después de guardar
      }
    }
  }

  cancel() {
    this.cancelForm.emit(); // Cambiamos el nombre del método
    this.showForm = false;
  }
}

