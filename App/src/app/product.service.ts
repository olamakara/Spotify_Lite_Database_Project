import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Product, ProductID} from './model/product';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {
  }

  getProductInfo(id: ProductID) {
    return this.http.get<Product>(`http://localhost:3000/product/${id}`);
  }
}
