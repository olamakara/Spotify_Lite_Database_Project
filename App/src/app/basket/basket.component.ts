import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {

  // tableData: any[] = [1, 2, 3];

  cart_items: any;

  user: any;

  user_id: string = "6463e6e93b305948b58fc23f";

  newBasketName: string = "";

  basketAlert: string = "";

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    this.http.get(`http://localhost:3000/users/${this.user_id}`).subscribe(data => {
      this.user = data;
    });
  }

  deleteBasketProduct(basket: string, product_id: string) {
    const info = {
      user_id: this.user_id,
      product_id: product_id
    }
    this.http.put(`http://localhost:3000/del_product/${basket}`, info).subscribe(data => {
      this.user = data;
    });
  }

  onKey(name: string) {
    this.newBasketName = name;
  }

  addBasket() {
    const info = {
      name: this.newBasketName
    }
    this.http.put(`http://localhost:3000/add_basket/${this.user_id}`, info).subscribe(data => {
      this.user = data;
    });
  }

  deleteBasket(name: string) {
    const info = {
      user_id: this.user_id,
      name: name
    }
    this.http.put(`http://localhost:3000/del_basket`, info).subscribe(data => {
      this.user = data;
    });
  }

  buyProduct(product: any, basket: string) {
    const info = {
      customer_id: this.user_id,
      product_id: product.product_id,
      basket: basket,
      quantity: product.quantity,
      seller_id: product.seller_id,
      name: product.name,
      price: product.price
    }
    this.http.put<any>(`http://localhost:3000/buy_product`, info).subscribe(res => {
      if (res.ret == -1) {
        this.basketAlert = "Nie można kupić produktu."
      } else {
        this.basketAlert = '';
      }
      this.user = res.user;
    });
  }

}
