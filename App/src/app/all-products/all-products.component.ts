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
  cart_id: string = "645b8a9fe6098e3d10e1aec2";

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.http.get('http://localhost:3000/products').subscribe(data => {
      this.products = data;
    });
  }

  updateQuantity(id: string, qty: number) {
    const updatedProduct = {
      _id: id,  // tego nie potrzebuje raczej
      quantity: qty
    };
    this.http.put(`http://localhost:3000/products/${id}`, updatedProduct).subscribe(() => {
      if (qty > 0) {
        this.addToCart(this.cart_id, id);
      } else {
        this.getProducts();
      }
    });
  }

  addToCart(cart_id: string, product_id: string) {
    const newCartItem = {
      cart_id: cart_id,
      product_id: product_id,
      quantity: 1  
    };
    this.http.post('http://localhost:3000/cart_item', newCartItem).subscribe(data => {
      
    });
    this.getProducts();
  }

}
