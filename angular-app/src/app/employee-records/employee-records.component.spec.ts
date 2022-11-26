import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { EmployeeRecordsComponent } from './employee-records.component';

describe('EmployeeRecordsComponent', () => {
  let component: EmployeeRecordsComponent;
  let fixture: ComponentFixture<EmployeeRecordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [EmployeeRecordsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EmployeeRecordsComponent);
    component = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  it('colName must contain all column names', () => {
    expect(component.colName).toEqual([
      'firstName',
      'middleName',
      'lastName',
      'email',
      'contact',
      'role',
      'address',
      'UserCustomer',
    ]);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('editMode must disable on clicking cancel button', () => {
    component.cancel();
    expect(component.editMode).toBe(false);
  });
});
