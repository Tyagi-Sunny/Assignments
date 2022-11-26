import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { fakeAsync, TestBed } from '@angular/core/testing';
import { CustomerStorageService } from './customer-storage.service';

describe('CustomerStorageService', () => {
  let customerStorageService: CustomerStorageService;
  let httpTestingController: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    customerStorageService = TestBed.inject(CustomerStorageService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('DataStorageService SHould be created', () => {
    expect(customerStorageService).toBeTruthy();
  });

  it('should get Customers correctly', fakeAsync(() => {
    const data = [
      {
        id: 1,
        name: 'name1',
        website: 'website1',
        address: 'address1',
      },
    ];
    customerStorageService.getCustomers().subscribe((res) => {
      expect(JSON.stringify(res)).toEqual(JSON.stringify(data));
    });
    let req = httpTestingController.expectOne(
      'http://localhost:3000/customers'
    );
    req.flush(data);
  }));
  it('should get users of selected customer', fakeAsync(() => {
    const data = [
      {
        id: 1,
        firstName: 'user1',
        middleName: 'na',
        lastName: 'na',
        email: 'user1@gmail.com',
        contact: '1111111111',
        address: 'noida',
        role: 'sde',
        UserCustomer: '1',
      },
    ];
    customerStorageService.getUsersOfCustomer(1).subscribe((res) => {
      expect(JSON.stringify(res)).toEqual(JSON.stringify(data));
    });
    let req = httpTestingController.expectOne(
      'http://localhost:3000/customers/1/users'
    );
    req.flush(data);
  }));

  it('should return error in case customers is not loaded', fakeAsync(() => {
    let error: string;
    customerStorageService.getCustomers().subscribe(null, (err) => {
      error = err;
      expect(error).toBeTruthy();
    });
    let req = httpTestingController.expectOne(
      'http://localhost:3000/customers'
    );
    req.flush('Something went wrong', {
      status: 404,
      statusText: 'Network Error',
    });
  }));

  it('should return error in case users is not returned for particular customers', fakeAsync(() => {
    let error: string;
    customerStorageService.getUsersOfCustomer(1).subscribe(null, (err) => {
      error = err;
      expect(error).toBeTruthy();
    });
    let req = httpTestingController.expectOne(
      'http://localhost:3000/customers/1/users'
    );
    req.flush('Something went wrong', {
      status: 404,
      statusText: 'Network Error',
    });
  }));
});
