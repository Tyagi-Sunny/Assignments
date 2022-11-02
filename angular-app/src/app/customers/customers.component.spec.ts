import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Customer } from '../models/customer.model';
import { CustomerStorageService } from '../shared/customer-storage.service';

import { CustomersComponent } from './customers.component';

class MockCustomerStorageService {
  getCustomers() {
    return [new Customer(1, 'google', 'google.com', 'noida')];
  }
}

describe('CustomersComponent', () => {
  let component: CustomersComponent;
  let fixture: ComponentFixture<CustomersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomersComponent],
      providers: [
        CustomersComponent,
        {
          provide: CustomerStorageService,
          useClass: MockCustomerStorageService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
