import { Component } from '@angular/core';

@Component({
  selector: 'app-products-filters',
  templateUrl: './products-filters.component.html',
  styleUrls: ['./products-filters.component.css']
})
export class ProductsFiltersComponent {

  filterName: string = "";

  filterCategory: string = "";

  filterMinPrice: string = "";

  filterMaxPrice: string = "";

  setName(name: string) {
    this.filterName = name;
  }

}
