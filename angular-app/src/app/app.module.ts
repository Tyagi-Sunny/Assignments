import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeeRecordsComponent } from './employee-records/employee-records.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent, EmployeeRecordsComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
