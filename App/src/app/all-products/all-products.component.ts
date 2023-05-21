import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css'],
})

export class AllProductsComponent implements OnInit {
  
  // tableData: any[] = [1, 2, 3, 4, 5, 6, 7];
  products: any[] = [];
  table: any[] = [];
  user: any;
  currentBasket: string = "";
  numProducts: number = 0;
  cart_id: string = "645b8a9fe6098e3d10e1aec2";
  user_id: string = "6463e6e93b305948b58fc23f";

  constructor(private http: HttpClient) { }

  ngOnInit() {
    // this.getProducts();
    this.http.get<any>(`http://localhost:3000/products/${this.user_id}`).subscribe(data => {
      this.products = data.products;
      this.user = data.user;
      this.numProducts = data.count;
      this.table = Array<number>(this.numProducts).fill(0);
    });
  }

  getProducts() {
    this.http.get<any>('http://localhost:3000/products').subscribe(data => {
      this.products = data.products;
      this.numProducts = data.count;
      this.table = Array<number>(this.numProducts).fill(0);
    });
  }

  getUser() {
    this.http.get(`http://localhost:3000/users/${this.user_id}`).subscribe(data => {
      this.user = data;
    });
  }

  addToBasket(product: any, idx: number) {
    if (this.table[idx] == 0 || this.currentBasket == "") {
      return;
    }
    const newProduct = {
      _id: product._id,
      name: product.name,
      quantity: this.table[idx],
      price: product.price,
      image: product.image,
      seller_id: product.seller_id,
      basket_name: this.currentBasket
    }
    this.http.put(`http://localhost:3000/users/${this.user_id}`, newProduct).subscribe(() => {
      
    });
    this.table[idx] = 0;
    this.emptyBasket();
  }

  plus(idx: number) {
    this.table[idx]++;
  }

  minus(idx: number) {
    this.table[idx]--;
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

  setBasket(basket: string) {
    this.currentBasket = basket;
  }

  emptyBasket() {
    this.currentBasket = "";
  }

}
