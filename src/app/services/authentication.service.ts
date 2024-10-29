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

  login(userName:string, token:string): void {
    this.localStorage.setUserNameInLocalStorage(userName);
    this.localStorage.setTokenInLocalStorage(token);
  }

  logout(): void {
    this.localStorage.removeUserNameFromLocalStorage();
  }
}
