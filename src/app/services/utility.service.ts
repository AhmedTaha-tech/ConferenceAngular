import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {
  prepareFormData(formData: any): any {
    const cleanedData = {};
  
    Object.keys(formData).forEach(key => {
      cleanedData[key] = formData[key] === '' || formData[key] === undefined ? null : formData[key];
    });
  
    return cleanedData;
  }
}
