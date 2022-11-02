import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { User } from '../models/user.model';
import { DataStorageService } from '../shared/data-storage.service';

interface EmployeeRecordInterface {
  editRecordIndex: number;
  editMode: boolean;
  employees: User[];
  editRecord: (index: number) => void;
  deleteRecord: (index: number) => void;
  changeRecord: (event: Event, property: string) => void;
  save: () => void;
  cancel: () => void;
}

const role: string[] = ['SuperAdmin', 'Admin', 'Subscriber'];

@Component({
  selector: 'app-employee-records',
  templateUrl: './employee-records.component.html',
  styleUrls: ['./employee-records.component.css'],
})
export class EmployeeRecordsComponent
  implements OnInit, EmployeeRecordInterface
{
  editRecordIndex: number;
  err: string = '';
  @Input() currentUserRole: string;
  editMode: boolean;
  @Input() employees: User[];
  myUser: User = new User(0, '', '', '', '', '', '', '', '');
  colName = [
    'firstName',
    'middleName',
    'lastName',
    'email',
    'contact',
    'role',
    'address',
    'UserCustomer',
  ];
  constructor(
    private dataService: DataStorageService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.editMode = false;
  }

  editRecord(index: number) {
    this.editMode = true;
    this.editRecordIndex = index;
    let editUser: User = this.employees[this.editRecordIndex];
    this.myUser.id = editUser.id;
    this.myUser.firstName = editUser.firstName;
    this.myUser.middleName = editUser.middleName;
    this.myUser.lastName = editUser.lastName;
    this.myUser.email = editUser.email;
    this.myUser.contact = editUser.contact;
    this.myUser.role = editUser.role;
    this.myUser.address = editUser.address;
    this.myUser.UserCustomer = editUser.UserCustomer;
  }

  deleteRecord(index: number) {
    this.dataService.deleteUser(this.employees[index].id).subscribe((data) => {
      this.employees.splice(index, 1);
    });

    if (this.editMode && this.editRecordIndex > index) {
      this.editRecordIndex--;
    }
  }
  cancel() {
    this.editMode = false;
  }
  save() {
    this.dataService.saveUser(this.myUser, this.myUser.id).subscribe((data) => {
      this.editMode = false;
      this.employees[this.editRecordIndex] = this.myUser;
    });
  }
  changeRecord(event: Event, property: string) {
    if (property === 'firstName') {
      this.myUser.firstName = (<HTMLInputElement>event.target).value;
    } else if (property === 'middleName') {
      this.myUser.middleName = (<HTMLInputElement>event.target).value;
    } else if (property === 'lastName') {
      this.myUser.lastName = (<HTMLInputElement>event.target).value;
    } else if (property === 'email') {
      this.myUser.email = (<HTMLInputElement>event.target).value;
    } else if (property === 'contact') {
      this.myUser.contact = (<HTMLInputElement>event.target).value;
    } else if (property === 'address') {
      this.myUser.address = (<HTMLInputElement>event.target).value;
    } else if (property === 'role') {
      this.myUser.role = (<HTMLInputElement>event.target).value;
    } else if (property === 'UserCustomer') {
      this.myUser.UserCustomer = (<HTMLInputElement>event.target).value;
    }
  }
  addRecord() {
    this.myUser.id = this.employees[this.employees.length - 1].id + 1;
    this.dataService.addUser(this.myUser).subscribe((data) => {
      this.employees.push(this.myUser);
    });
  }
}
