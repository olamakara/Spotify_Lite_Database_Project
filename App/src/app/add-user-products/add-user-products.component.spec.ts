import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUserProductsComponent } from './add-user-products.component';

describe('AddUserProductsComponent', () => {
  let component: AddUserProductsComponent;
  let fixture: ComponentFixture<AddUserProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUserProductsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddUserProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
