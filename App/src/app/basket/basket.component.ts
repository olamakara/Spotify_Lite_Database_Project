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

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getCartItems();
  }

  getCartItems() {
    this.http.get('http://localhost:3000/cart_item').subscribe(data => {
      this.cart_items = data;
    });
  }

}
