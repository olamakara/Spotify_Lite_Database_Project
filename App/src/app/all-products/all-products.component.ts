import { Component, OnInit } from '@angular/core';
// import { OracleService } from '../oracle.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css'],
  // template: `
  //   <ul>
  //     <li *ngFor="let item of tableData">{{ item.name }}</li>
  //   </ul>
  // `
})

export class AllProductsComponent {
  
  tableData: any[] = [1, 2, 3, 4, 5, 6, 7];

  // constructor(private oracleService: OracleService) {}
  constructor() {}

  // ngOnInit() {
  //   this.oracleService.getTableData()
  //     .then(data => {
  //       this.tableData = data;
  //     })
  //     .catch(err => {
  //       console.error('Błąd pobierania danych z tabeli:', err);
  //     });
  // }
}
