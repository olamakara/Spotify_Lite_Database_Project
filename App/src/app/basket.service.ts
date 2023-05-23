import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Basket} from './model/basket';
import {Product, ProductID} from './model/product';
import {User} from './model/user';


@Injectable({
  providedIn: 'root'
})
export class BasketService {
  private basketContent: Map<ProductID, Product> = new Map();
  private name: string | undefined;
  private userID: string | undefined;

  constructor(private http: HttpClient) {
  }

  private add(product: Product) {
    if (product.quantity === 0)
      return;

    const basketProduct: Product = Object.assign(product, {
      quantity: 1
    });
    this.basketContent.set(product._id, basketProduct);
  }

  changeBasket(basket: string) {
    this.name = basket;
  }

  decreaseQuantityInBasket(product: Product, quantity = 1) {
    if (!this.basketContent.has(product._id))
      return 0;

    const productInBasket = this.basketContent.get(product._id)!;
    if (productInBasket.quantity - 1 < 0)
      this.basketContent.delete(product._id);
    else {
      this.basketContent.set(product._id, {
        ...productInBasket,
        quantity: productInBasket.quantity - quantity
      });
    }

    return this.basketContent.get(product._id)!.quantity;
  }

  private emptyBasket() {
    this.name = '';
    this.basketContent.clear();
  }

  async getUserBaskets(id: string): Promise<Basket[]> {
    return new Promise(resolve => {
      this.http.get<User>(`http://localhost:3000/user/${id}`).subscribe(user => {
        resolve(user.baskets);
      });
    });
  }

  increaseQuantityInBasket(product: Product, quantity = 1) {
    if (!this.basketContent.has(product._id))
      this.add(product);
    else {
      const productInBasket = this.basketContent.get(product._id)!;
      this.basketContent.set(product._id, {
        ...productInBasket,
        quantity: productInBasket.quantity + quantity
      });
    }

    return this.basketContent.get(product._id)!.quantity;
  }

  provideUserID(id: string) {
    this.userID = id;
  }

  save() {
    if (!this.name || !this.userID)
      return;

    for (const item of this.basketContent.values()) {
      const basketProduct = {
        ...item,
        basket_name: this.name
      };

      this.http.put(`http://localhost:3000/users/${this.userID}`, basketProduct).subscribe(res => {
        console.log(res);
      });
      console.log(this.name, this.userID, basketProduct._id);
    }

    this.emptyBasket();
  }
}
