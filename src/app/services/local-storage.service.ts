import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  constructor() {}

  setUserIdInLocalStorage(userId:string) {
    return this.setItem('UserId',userId);
  } 
  retrieveUserIdFromLocalStorage() {
    return this.getItem('UserId')??"";
  } 
  removeUserIdFromLocalStorage(){
    return this.removeItem('UserId');
  }

  setUserNameInLocalStorage(userName:string) {
    return this.setItem('UserName',userName);
  } 
  retrieveUserNameFromLocalStorage() {
    return this.getItem('UserName')??"";
  } 
  removeUserNameFromLocalStorage(){
    return this.removeItem('UserName');
  }

  setFirstNameInLocalStorage(firstName:string) {
    return this.setItem('FirstName',firstName);
  } 
  retrieveFirstNameFromLocalStorage() {
    return this.getItem('FirstName')??"";
  } 
  removeFirstNameFromLocalStorage(){
    return this.removeItem('FirstName');
  }


  setLastNameInLocalStorage(lasttName:string) {
    return this.setItem('LastName',lasttName);
  } 
  retrieveLastNameFromLocalStorage() {
    return this.getItem('LastName')??"";
  } 
  removeLastNameFromLocalStorage(){
    return this.removeItem('LastName');
  }

  setTokenInLocalStorage(token:string) {
    return this.setItem('Token',token);
  } 
  retrieveTokenFromLocalStorage() {
    return this.getItem('Token')??"";
  } 
  removeTokenFromLocalStorage(){
    return this.removeItem('Token');
  }


  // Set a value in local storage
  setItem(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  // Get a value from local storage
  getItem(key: string): string | null {
    return localStorage.getItem(key);
  }

  // Remove a value from local storage
  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  // Clear all items from local storage
  clear(): void {
    localStorage.clear();
  }
}