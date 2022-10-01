import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  dataLoaded: boolean = false;
  title = 'angular-app';
  loadEmployee() {
    this.dataLoaded = true;
  }
}
