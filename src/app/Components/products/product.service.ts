import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';
import { Category, Product } from './product';

@Injectable({
    providedIn: 'root'
})

export class ProductService {

    private url = 'http://localhost:3000';
    private productList$: Subject<Category[]> = new Subject();

    constructor(private httpClient: HttpClient) { }

    private refreshProducts() {
        this.httpClient.get<Category[]>(`${this.url}/order/getAllProducts`)
            .subscribe(products => {
                console.log(products);
                console.log(products);
                this.productList$.next(products);
            });
    }

    getAllProducts(): Subject<Category[]> {
        this.refreshProducts();
        return this.productList$;
    }

    addToCart(userId: string, products: string[]) {
        if (userId == '') { return }
        const body = { products: products };
        return this.httpClient.post(`${this.url}/cart/addCart/${userId}`, body).subscribe(
            (response) => {
                console.log(response);
            }
        );
    }

    addOrder(userId: string, productId: string[], shippingAddress: string, status: string) {
        const body = {
            user_id: userId,
            product_id: productId,
            shipping_address: shippingAddress,
            status: status,

        };

        return this.httpClient.post(`${this.url}/order/addOrder`, body).subscribe(
            (response) => {
                console.log(response);
            }
        );

    }


}
