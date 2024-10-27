import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { QrService } from '../../../../services/qr.service';
import { BrowserMultiFormatReader } from '@zxing/browser';
import { NgxScannerQrcodeComponent, NgxScannerQrcodeService, ScannerQRCodeConfig, ScannerQRCodeResult, ScannerQRCodeSelectedFiles} from 'ngx-scanner-qrcode';

@Component({
  selector: 'app-qr-scanner',
  templateUrl: './qr-scanner.component.html',
  styleUrl: './qr-scanner.component.css'
})
export class QrScannerComponent{

  config: Object = {
    isAuto: true,
    text: { font: '25px serif' }, // Hiden { font: '0px' },
    frame: { lineWidth: 8 },
    medias: {
      audio: false,
      video: {
        facingMode: 'environment', // To require the rear camera https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia
        width: { ideal: 1280 },
        height: { ideal: 720 }
      }
    }
  };

  //selectedFiles: SelectedFiles[] = [];

  constructor(private qrcode: NgxScannerQrcodeService) { }

   onError(e: any): void {
    alert(e);
  }

  handle(action: any, fn: string): void {
    action[fn]().subscribe(console.log, console.error);
  }

  // onSelects(files: any) {
  //   this.qrcode.loadFiles(files, this.config).subscribe(res => {
  //     this.selectedFiles = res.filter(f => f.urlQR);
  //     console.log(res); // v1.0.25 Fixed issue https://stackoverflow.com/questions/74245551/ngx-scanner-qrcode-reading-data-in-ts
  //   });
  // }









  // ConfirmSubscriberAttendance() {
  //   if (this.qrCodeText != '') {
  //     this.qrService.ConfirmSubscriberAttendance(this.body).subscribe(
  //       (response) => {
  //         if (response.status_code == 200) {
  //           console.log('QR Code scanned successfully!', response);
  //           this.showSuccessMessage = true; // Show success message
  //           this.hideSuccessMessageAfterDelay(); // Call the method to hide it after a delay
  //         }
  //         else
  //         this.errorMessage="Error "
  //       },
  //       (error) => {
  //         console.error('Error in QR Code Scanner :', error);
  //       }
  //     );
  //   }
  // }

  // hideSuccessMessageAfterDelay() {
  //   setTimeout(() => {
  //     this.showSuccessMessage = false; // Hide success message after 5 seconds
  //     this.qrCodeText=''
  //   }, 5000); // 5000 milliseconds = 5 seconds
  // }
}