import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DashboardHomeService } from './dashboard-home.service';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClientSubscriptionService {
  static urlApi = `${environment.apiHost}`;

  constructor(private http: HttpClient) {}

  AddConferenceSubscription(clientData: any): Observable<any> {
    return this.http.post(`${DashboardHomeService.urlApi}AddConferenceSubscription`,clientData);
  }
}
