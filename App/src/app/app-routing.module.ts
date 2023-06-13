import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AllProductsComponent} from './all-products/all-products.component';
import {BasketComponent} from './basket/basket.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {ProductInfoComponent} from './product-info/product-info.component';
import {UserInfoComponent} from './user-info/user-info.component';
import { PurchasedProductsListComponent } from './purchased-products-list/purchased-products-list.component';
import { ProductsSoldListComponent } from './products-sold-list/products-sold-list.component';
import { AddUserProductsComponent } from './add-user-products/add-user-products.component';
import { EditUserProductsComponent } from './edit-user-products/edit-user-products.component';


const routes: Routes = [
  {path: 'start', component: AllProductsComponent},
  {path: 'basket', component: BasketComponent},
  {path: 'user-info', component: UserInfoComponent},
  {path: 'product/:id', component: ProductInfoComponent},
  {path: 'user-purchased', component: PurchasedProductsListComponent },
  {path: 'user-sold', component: ProductsSoldListComponent },
  {path: 'add-product', component: AddUserProductsComponent },
  {path: 'edit-product/:id', component: EditUserProductsComponent },
  {path: '', redirectTo: '/start', pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
