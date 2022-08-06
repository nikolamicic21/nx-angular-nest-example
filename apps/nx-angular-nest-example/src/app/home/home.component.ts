import { Component } from '@angular/core';
import { Message } from '@nx-angular-nest-example/api-interfaces';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'nx-angular-nest-example-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  hello$ = this.http.get<Message>(environment.apiUrl + '/api/hello');

  constructor(private http: HttpClient) {}
}
