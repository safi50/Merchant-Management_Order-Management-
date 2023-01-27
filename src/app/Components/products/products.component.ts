import { Component, OnInit } from '@angular/core';
import { Category, Product } from './product';
import { Observable } from 'rxjs';
import { ProductService } from './product.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {

  productList$: Observable<Category[]> = new Observable();
  userId: string;


  constructor(private productService: ProductService, private snackBar: MatSnackBar, private router: Router) {
    this.userId = '';
    this.fetchAllProducts();
  }

  ngOnInit(): void {
  }


  private fetchAllProducts(): void {
    this.productList$ = this.productService.getAllProducts();
  }


  printID() {
    console.log(this.userId);
    this.snackBar.open('User selected Successfully!', '', {
      duration: 3000,
    });
  }

  navigateToCart() {
    this.router.navigate(['cart'], { queryParams: { userId: this.userId } });
  }
}
