import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-user-products',
  templateUrl: './add-user-products.component.html',
  styleUrls: ['./add-user-products.component.css']
})
export class AddUserProductsComponent implements OnInit {
  new_product = new FormGroup({
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

  showError = false;
  showOk = false;

  products: any;

  user_id: string = "6463e6e93b305948b58fc23f";

  constructor(private http: HttpClient) { }

  ngOnInit(): void { }

  addProduct() {
    this.showError = false;
    this.showOk = false;
    if (!this.new_product.valid) {
      this.showError = true;
      return;
    }

    let info = {
      user_id: this.user_id,
      name: this.new_product.get("name")!.value,
      quantity: this.new_product.get("quantity")!.value,
      image: this.new_product.get("image")!.value,
      category: this.new_product.get("category")!.value,
      description: this.new_product.get("description")!.value,
      price: this.new_product.get("price")!.value
    }

    this.http.put(`http://localhost:3000/add_product`, info).subscribe(data => {
      this.products = data;
    });
    this.showOk = true;
  }

}
