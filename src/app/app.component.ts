import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ProductsService } from './service/products.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  
  constructor(public productsService: ProductsService) { }
  
  restart(){
    this.productsService.loadsProducts();
  }
 
}
