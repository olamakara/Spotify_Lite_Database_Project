import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuBarComponent } from './menu-bar/menu-bar.component';
import { AllProductsComponent } from './all-products/all-products.component';
import { BasketComponent } from './basket/basket.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { HttpClientModule } from '@angular/common/http';

import '../polyfill';
import { CustomersListComponent } from './customers-list/customers-list.component';
import { ProductsFiltersComponent } from './products-filters/products-filters.component';
import { PurchasedProductsListComponent } from './purchased-products-list/purchased-products-list.component';
import { ProductsSoldListComponent } from './products-sold-list/products-sold-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { ProductInfoComponent } from './product-info/product-info.component';
import { AddUserProductsComponent } from './add-user-products/add-user-products.component'
import { ReactiveFormsModule } from '@angular/forms';
import { EditUserProductsComponent } from './edit-user-products/edit-user-products.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuBarComponent,
    AllProductsComponent,
    BasketComponent,
    PageNotFoundComponent,
    UserInfoComponent,
    CustomersListComponent,
    ProductInfoComponent,
    ProductsFiltersComponent,
    PurchasedProductsListComponent,
    ProductsSoldListComponent,
    AddUserProductsComponent,
    EditUserProductsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
