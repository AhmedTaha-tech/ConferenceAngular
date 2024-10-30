import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class DashboardHomeService {
  filterParam: string='';
  static urlApi = `${environment.apiHost}`;
  constructor(private http: HttpClient) {}

  GetClientsSubscribed(
    pageIndex: number,
    pageSize: number,
    firstName?: string | null,
    lastName?: string | null,
    email?: string | null,
    phoneNumber?: string | null,
    createdAt?: string | null,
    attendance?: string | null
  ): Observable<any> {
    this.filterParam=''
    let params = new HttpParams()
    .set('pageIndex', pageIndex)
    .set('pageSize', pageSize);
    if (firstName != null && firstName != undefined) {
      this.filterParam += `&FirstName=${firstName}`;
    }
    if (lastName != null && lastName != undefined) {
      this.filterParam += `&LastName=${lastName}`;
    }
    if (email != null && email != undefined) {
      this.filterParam += `&Email=${email}`;
    }
    if (phoneNumber != null && phoneNumber != undefined) {
      this.filterParam += `&PhoneNumber=${phoneNumber}`;
    }
    if (createdAt != null && createdAt != undefined) {
      this.filterParam += `&CreatedAt=${createdAt}`;
    }
    if (attendance != null && attendance != undefined) {
      this.filterParam += `&attendance=${attendance}`;
    }
    return this.http.get(
      `${DashboardHomeService.urlApi}GetClientsSubscribed?${params.toString()}${
        this.filterParam
      }`
    );
  }
  
  GetClientsSubscribedReport(
    firstName?: string | null,
    lastName?: string | null,
    email?: string | null,
    phoneNumber?: string | null,
    createdAt?: string | null,
    attendance?: string | null
  ): Observable<any> {
    this.filterParam=''
    let params = new HttpParams();
    if (firstName != null && firstName != undefined) {
      this.filterParam += `&FirstName=${firstName}`;
    }
    if (lastName != null && lastName != undefined) {
      this.filterParam += `&LastName=${lastName}`;
    }
    if (email != null && email != undefined) {
      this.filterParam += `&Email=${email}`;
    }
    if (phoneNumber != null && phoneNumber != undefined) {
      this.filterParam += `&PhoneNumber=${phoneNumber}`;
    }
    if (createdAt != null && createdAt != undefined) {
      this.filterParam += `&CreatedAt=${createdAt}`;
    }
    if (attendance != null && attendance != undefined) {
      this.filterParam += `&Attendance=${attendance}`;
    }
    return this.http.get(`${DashboardHomeService.urlApi}GetClientsSubscribedReport?${this.filterParam}`);
  }
}
