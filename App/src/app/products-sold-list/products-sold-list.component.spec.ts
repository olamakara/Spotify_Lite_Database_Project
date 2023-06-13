import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsSoldListComponent } from './products-sold-list.component';

describe('ProductsSoldListComponent', () => {
  let component: ProductsSoldListComponent;
  let fixture: ComponentFixture<ProductsSoldListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductsSoldListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsSoldListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
