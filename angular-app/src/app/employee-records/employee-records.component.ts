import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { User } from '../models/user.model';

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

@Component({
  selector: 'app-employee-records',
  templateUrl: './employee-records.component.html',
  styleUrls: ['./employee-records.component.css'],
})
export class EmployeeRecordsComponent
  implements OnInit, EmployeeRecordInterface
{
  editRecordIndex: number;
  editMode: boolean;
  employees: User[] = [
    new User(
      'Sunny',
      'NA',
      'Tyagi',
      'sunny.tyagi@sourcefuse.com',
      '6396786017',
      'sde',
      'gzb'
    ),
    new User(
      'Deepak',
      'NA',
      'Kumar',
      'deepak.kumar@sourcefuse.com',
      '85590 10326',
      'Sr. Tech Lead',
      'Mohali'
    ),
    new User(
      'Samarpan',
      'NA',
      'Bhattacharya',
      'samarpan.bhattacharya@sourcefuse.com',
      '9999909854',
      'Principal Architect',
      'Mohali'
    ),
    new User(
      'Neha',
      'NA',
      'Tyagi',
      'neha@sourcefuse.com',
      '7838467271',
      'sde',
      'gzb'
    ),
  ];
  myUser: User = new User('', '', '', '', '', '', '');
  colName = [
    'firstName',
    'middleName',
    'lastName',
    'email',
    'phone',
    'role',
    'address',
  ];
  constructor() {}

  ngOnInit(): void {
    this.editMode = false;
  }

  editRecord(index: number) {
    this.editMode = true;
    this.editRecordIndex = index;
    console.log(this.editRecordIndex);
    let editUser: User = this.employees[this.editRecordIndex];

    this.myUser.firstName = editUser.firstName;
    this.myUser.middleName = editUser.middleName;
    this.myUser.lastName = editUser.lastName;
    this.myUser.email = editUser.email;
    this.myUser.phone = editUser.phone;
    this.myUser.role = editUser.role;
    this.myUser.address = editUser.address;
  }

  deleteRecord(index: number) {
    this.employees.splice(index, 1);
    if (this.editMode && this.editRecordIndex > index) {
      this.editRecordIndex--;
    }
  }
  cancel() {
    this.editMode = false;
  }
  save() {
    this.editMode = false;
    this.employees[this.editRecordIndex] = this.myUser;
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
    } else if (property === 'phone') {
      this.myUser.phone = (<HTMLInputElement>event.target).value;
    } else if (property === 'address') {
      this.myUser.address = (<HTMLInputElement>event.target).value;
    } else if (property === 'role') {
      this.myUser.role = (<HTMLInputElement>event.target).value;
    }
  }
  addRecord() {
    this.employees.push(this.myUser);
  }
}
