import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css'],
})

export class AllProductsComponent implements OnInit {
  
  // tableData: any[] = [1, 2, 3, 4, 5, 6, 7];
  products: any;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get('http://localhost:3000/products').subscribe(data => {
      this.products = data;
    });
  }

}
