import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private localStorage:LocalStorageService) { }

  isAuthenticated(): boolean {
    return this.localStorage.retrieveUserNameFromLocalStorage()!="";
  }

  login(userName:string,firstName:string , lastName:string, token:string): void {
    this.localStorage.setUserNameInLocalStorage(userName);
    this.localStorage.setFirstNameInLocalStorage(firstName);
    this.localStorage.setLastNameInLocalStorage(lastName);
    this.localStorage.setTokenInLocalStorage(token);
  }

  logout(): void {
    this.localStorage.removeUserNameFromLocalStorage();
  }
}
