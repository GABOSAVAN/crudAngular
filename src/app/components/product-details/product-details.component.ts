import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MaterialModule } from '../../material';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent{


  constructor(private router: Router) { }

  goToProducts() {
    this.router.navigate(['/products']);
  }

  goToFormProduct() {
    this.router.navigate(['/form-product']);
  }

}
