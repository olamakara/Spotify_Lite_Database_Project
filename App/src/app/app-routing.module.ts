import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AllProductsComponent} from './all-products/all-products.component';
import {BasketComponent} from './basket/basket.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {ProductInfoComponent} from './product-info/product-info.component';
import {UserInfoComponent} from './user-info/user-info.component';


const routes: Routes = [
  {path: 'start', component: AllProductsComponent},
  {path: 'basket', component: BasketComponent},
  {path: 'user-info', component: UserInfoComponent},
  {path: 'product/:id', component: ProductInfoComponent},
  {path: '', redirectTo: '/start', pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
