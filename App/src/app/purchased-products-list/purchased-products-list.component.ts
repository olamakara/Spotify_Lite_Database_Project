import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-purchased-products-list',
  templateUrl: './purchased-products-list.component.html',
  styleUrls: ['./purchased-products-list.component.css']
})
export class PurchasedProductsListComponent implements OnInit {

  orders: any;

  user_id: string = "6463e6e93b305948b58fc23f";

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.http.get(`http://localhost:3000/orders/${this.user_id}`).subscribe(data => {
      this.orders = data;
    })
  }


}
