import { Component } from '@angular/core';
import { Message } from '@nx-angular-nest-example/api-interfaces';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'nx-angular-nest-example-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent {
  hello$ = this.http.get<Message>(environment.apiUrl + '/api/admin/hello');

  constructor(private http: HttpClient) {}
}
