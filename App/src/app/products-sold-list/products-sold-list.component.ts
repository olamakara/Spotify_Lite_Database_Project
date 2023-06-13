import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogModule } from "@angular/material";

@Component({
  selector: 'app-products-sold-list',
  templateUrl: './products-sold-list.component.html',
  styleUrls: ['./products-sold-list.component.css']
})
export class ProductsSoldListComponent implements OnInit {

  products: any;

  user_id: string = "6463e9f01e07984af0f036dc";

  constructor(private http: HttpClient, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.http.get(`http://localhost:3000/products_sold/${this.user_id}`).subscribe(data => {
      this.products = data;
    })
  }

  editProduct(product_id) {
  }

  deleteProduct(product_id) {
    const info = {
      product_id: product_id,
      user_id: this.user_id
    }

    this.http.put(`http://localhost:3000/del_user_product`, info).subscribe(data => {
      this.products = data;
    });
  }

  openEditDialog(product_id) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      id: 1,
      title: 'Angular For Beginners'
    };

    this.dialog.open(EditDialogComponent, dialogConfig);
  }

}
