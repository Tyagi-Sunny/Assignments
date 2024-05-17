import { fakeAsync, TestBed } from '@angular/core/testing';
import { DataStorageService } from './data-storage.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { User } from '../models/user.model';

describe('UserService', () => {
  let httpUserService: DataStorageService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    httpUserService = TestBed.inject(DataStorageService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(httpUserService).toBeTruthy();
  });

  it('should get users correctly', fakeAsync(() => {
    const sudoData = [
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

    httpUserService.loadUser().subscribe((res) => {
      expect(JSON.stringify(res)).toEqual(JSON.stringify(sudoData));
    });
    let req = httpTestingController.expectOne(
      'http://localhost:3000/users?filter=%7B%22include%22:%5B%7B%22relation%22:%22UserCustomer%22%7D%5D%7D'
    );
    expect(req.request.method).toEqual('GET');
    req.flush(sudoData);
  }));

  it('should delete user correctly on calling the deleteUser function', fakeAsync(() => {
    httpUserService.deleteUser(1).subscribe(() => {});
    let req = httpTestingController.expectOne('http://localhost:3000/users/1');
    expect(req.request.method).toEqual('DELETE');
  }));

  it('should return error in case users is not loaded', fakeAsync(() => {
    let error: string;
    httpUserService.loadUser().subscribe(null, (err) => {
      error = err;
      expect(error).toBeTruthy();
    });
    let req = httpTestingController.expectOne(
      'http://localhost:3000/users?filter=%7B%22include%22:%5B%7B%22relation%22:%22UserCustomer%22%7D%5D%7D'
    );
    req.flush('Something went wrong', {
      status: 404,
      statusText: 'Network Error',
    });
  }));

  it('should post user correctly', fakeAsync(() => {
    let data: User = new User(
      1,
      'fname',
      'na',
      'lname',
      'abc@gmail.com',
      '2345678901',
      'sde',
      'address',
      ''
    );
    httpUserService.addUser(data).subscribe((res) => {
      expect(JSON.stringify(res)).toEqual(JSON.stringify(data));
    });
    let req = httpTestingController.expectOne('http://localhost:3000/users');
    req.flush(data);
  }));
});
