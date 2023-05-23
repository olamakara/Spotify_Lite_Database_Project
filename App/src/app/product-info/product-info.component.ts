import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {BasketService} from '../basket.service';
import {Basket} from '../model/basket';
import {Product, ProductID} from '../model/product';
import {ProductService} from '../product.service';


@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.css']
})
export class ProductInfoComponent implements OnInit {
  public inBasketCount = 0;
  public product: Product | undefined;
  public selectedBasketName = '';
  public userBaskets: Basket[] = [];

  private id: ProductID;
  private userID: string = '6463e6e93b305948b58fc23f';

  constructor(
    private basketService: BasketService,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    const id = route.snapshot.paramMap.get('id');
    if (!id)
      router.navigate(['404']);
    this.id = id!;

    this.basketService.provideUserID(this.userID);
  }

  public ngOnInit(): void {
    this.productService.getProductInfo(this.id).subscribe(product => {
      this.product = product;
    });

    // nie zamyka się połączenia z bazą danych na każdym requeście -_-
    // dzięki temu nie można wykonać 2 żądań po sobie, bo, mongo driver próbuje wykorzystać połączenie z puli połączeń,
    // które jest zamykane przez poprzedni endpoint,
    //
    // zapiszcie połączenie jako singletona czy coś w ten deseń
    setTimeout(() => {
      this.basketService.getUserBaskets(this.userID).then(baskets => {
        this.userBaskets = baskets;
      });
    }, 2500);
  }

  public increaseInBasket() {
    if (this.product && this.inBasketCount < this.product.quantity)
      this.inBasketCount = this.basketService.increaseQuantityInBasket({...this.product});
  }

  public decreaseInBasket() {
    if (this.product && this.product.quantity > 0)
      this.inBasketCount = this.basketService.decreaseQuantityInBasket({...this.product});
  }

  public saveToBasket() {
    // clear local state of basked; baset service should handle itself after save
    this.basketService.save();

    this.inBasketCount = 0;
    this.selectedBasketName = '';
  }

  public selectBasket(name: string) {
    this.basketService.changeBasket(name);
    this.selectedBasketName = name;
  }
}
