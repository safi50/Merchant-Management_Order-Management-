import { Component, OnInit } from '@angular/core';
import { Cart } from './cart';
import { Observable } from 'rxjs';
import { CartService } from './cart.service';
import { Router, ActivatedRoute } from '@angular/router';
import { OrdersComponent } from '../orders/orders.component';
import { ProductService } from '../products/product.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  userId: string = '';
  address: string = '';
  cartResponse: Observable<Cart[]> = new Observable();
  cart: string[] = [];

  constructor(private productService: ProductService, private cartService: CartService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.userId = params['userId'];
    });
    this.getCart(this.userId);
  }

  navigateToHome() {
    this.router.navigate(['products']);
  }


  getCart(userId: string) {
    this.cartResponse = this.cartService.getCartItems(this.userId);
    this.cartResponse.subscribe(
      (response) => {
        console.log(response);
        this.cart = response[0].cart;
        console.log(this.cart);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  deleteCartItem(product: string) {
    this.cartService.deleteFromCart(this.userId, product).subscribe(
      (response) => {
        console.log(response);
        this.getCart(this.userId);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  addOrder() {
    this.productService.addOrder(this.userId, this.cart, this.address, 'not delivered');
    this.navigateToHome();

  }
}
