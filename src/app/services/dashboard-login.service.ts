import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { DashboardHomeService } from './dashboard-home.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardLoginService {
  static urlApi = `${environment.apiHost}`;

  constructor(private http: HttpClient) {}

  Login(loginData: any): Observable<any> {
    return this.http.post(`${DashboardHomeService.urlApi}Login`,loginData);
  }
}
