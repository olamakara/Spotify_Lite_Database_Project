import {HttpClient} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Product, ProductID} from '../model/product';


@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})

export class AllProductsComponent implements OnInit {

  // tableData: any[] = [1, 2, 3, 4, 5, 6, 7];
  products: Product[] = [];
  table: any[] = [];
  user: any;
  currentBasket: string = '';
  numProducts: number = 0;
  cart_id: string = '645b8a9fe6098e3d10e1aec2';
  user_id: string = '6463e6e93b305948b58fc23f';

  constructor(private http: HttpClient, private router: Router) {
  }
  filterName: string = "";
  // name: boolean = false;

  filterCategory: string = "";

  filterMinPrice: number = 0

  filterMaxPrice: number = 100000000;


  setName(name: string) {
    this.filterName = name;
  }

  ifName(name: string) {
    if (name === this.filterName || this.filterName === "") {
      return true;
    }
    return false;
  }

  setCategory(category: string) {
    this.filterCategory = category;
  }

  ifCategory(category: string) {
    if (category === this.filterCategory || this.filterCategory === "") {
      return true;
    }
    return false;
  }

  setMinPrice(price: string) {
    if (price === "") {
      this.filterMinPrice = 0;
    } else {
      this.filterMinPrice = parseFloat(price);
    }
  }

  setMaxPrice(price: string) {
    if (price === "") {
      this.filterMaxPrice = 100000000;
    } else {
      this.filterMaxPrice = parseFloat(price);
    }
  }

  ifPrice(price: number) {
    if (price >= this.filterMinPrice && price <= this.filterMaxPrice) {
      return true;
    }
    return false;
  }

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
    if (this.table[idx] == 0 || this.currentBasket == '') {
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
    };
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

  setBasket(basket: string) {
    this.currentBasket = basket;
  }

  emptyBasket() {
    this.currentBasket = '';
  }

  getFilteredProducts() {
    const info = {
      name: this.filterName,
      category: this.filterCategory,
      min_price: this.filterMinPrice,
      max_price: this.filterMaxPrice
    }
    this.http.post<any>(`http://localhost:3000/filterproducts`, info).subscribe(data => {
      this.products = data.products;
      this.numProducts = data.count;
      this.table = Array<number>(this.numProducts).fill(0);
    });
  }
  viewProduct(id: ProductID) {
    // todo: handle promise error
    this.router.navigate([`product/${id}`]);
  }
}
