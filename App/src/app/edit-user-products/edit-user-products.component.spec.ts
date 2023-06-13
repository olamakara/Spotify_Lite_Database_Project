import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUserProductsComponent } from './edit-user-products.component';

describe('EditUserProductsComponent', () => {
  let component: EditUserProductsComponent;
  let fixture: ComponentFixture<EditUserProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditUserProductsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditUserProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
