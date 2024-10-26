import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { BrowserMultiFormatReader } from '@zxing/browser';
import { DashboardHomeService } from './dashboard-home.service';


@Injectable({
  providedIn: 'root'
})
export class QrService {
  static urlApi = `${environment.apiHost}`;
  private codeReader: BrowserMultiFormatReader;

  constructor(private http: HttpClient) {
    this.codeReader = new BrowserMultiFormatReader();
    
  }

  decodeFromBlob(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.src = URL.createObjectURL(blob);

      image.onload = () => {
        this.codeReader
          .decodeFromImageElement(image)
          .then((result) => {
            resolve(result.getText());
          })
          .catch((error) => {
            console.error('Error decoding QR code:', error);
            reject('Failed to decode QR code');
          })
          .finally(() => {
            URL.revokeObjectURL(image.src); // تنظيف الموارد
          });
      };

      image.onerror = () => {
        reject('Could not load image for decoding');
      };
    });
  }

  ConfirmSubscriberAttendance2(QrCodeTextContent: any): Observable<any> {
    return this.http.post(`${DashboardHomeService.urlApi}ConfirmSubscriberAttendance`,JSON.stringify(QrCodeTextContent));
    // return this.http.post(`${DashboardHomeService.urlApi}ConfirmSubscriberAttendance?QrCodeTextContent=${QrCodeTextContent}`);
  }

  headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  
  ConfirmSubscriberAttendance(body: any): Observable<any> {
    return this.http.post("https://localhost:44336/api/v1/ConfirmSubscriberAttendance", body);
  }

    
}
