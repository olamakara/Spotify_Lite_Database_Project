import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-user-products',
  templateUrl: './edit-user-products.component.html',
  styleUrls: ['./edit-user-products.component.css']
})
export class EditUserProductsComponent implements OnInit {

  edit_product = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(2)
    ]),
    quantity: new FormControl('', [
      Validators.required
    ]),
    image: new FormControl('', [
      Validators.required
    ]),
    category: new FormControl('', [
      Validators.required
    ]),
    description: new FormControl(''),
    price: new FormControl('', [
      Validators.required
    ])
  })

  product_id: any;
  product: any;

  showError = false;
  showOk = false;

  user_id: string = "6463e6e93b305948b58fc23f";

  private subscription: Subscription;
  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
    this.subscription = this.route.params.subscribe((params) => {
      this.product_id = params['id'];
    });
    console.log(this.product_id);
    this.getProduct();
    this.edit_product.patchValue(this.product);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getProduct() {
    this.http.get(`http://localhost:3000/product/${this.product_id}`).subscribe(data => {
      this.product = data;
    });
  }

  editProduct() {
    this.showError = false;
    this.showOk = false;
    if (!this.edit_product.valid) {
      this.showError = true;
      return;
    }

    let info = {
      product_id: this.product_id,
      name: this.edit_product.get("name")!.value,
      quantity: this.edit_product.get("quantity")!.value,
      image: this.edit_product.get("image")!.value,
      category: this.edit_product.get("category")!.value,
      description: this.edit_product.get("description")!.value,
      price: this.edit_product.get("price")!.value
    }

    console.log(info.product_id);
    this.http.put(`http://localhost:3000/edit_product`, info).subscribe(data => {
      this.product = data;
    });
    this.showOk = true;
  }
}
