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

  constructor(private http: HttpClient) { }

  ngOnInit() {
    // this.getCartItems();
    this.getUser();
  }

  // getCartItems() {
  //   this.http.get('http://localhost:3000/cart_item').subscribe(data => {
  //     this.cart_items = data;
  //   });
  // }

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
}
