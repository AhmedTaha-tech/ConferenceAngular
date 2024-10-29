import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { QrService } from '../../../../services/qr.service';
import { BrowserMultiFormatReader } from '@zxing/browser';
import {
  NgxScannerQrcodeComponent,
  NgxScannerQrcodeService,
  ScannerQRCodeConfig,
  ScannerQRCodeResult,
  ScannerQRCodeSelectedFiles,
} from 'ngx-scanner-qrcode';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-qr-scanner',
  templateUrl: './qr-scanner.component.html',
  styleUrl: './qr-scanner.component.css',
})
export class QrScannerComponent implements AfterViewInit {
  errorMessage: string | null = null;
  qrCodeText: string | null = null;
  qrCodeTextArray: string[] = [];
  showSuccessMessage = false;
  enableConfirmButton = false;
  isLoading = false;
  body = {
    qrCodeTextContent: this.qrCodeText,
  };

  // https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia#front_and_back_camera
  config: ScannerQRCodeConfig = {
    constraints: {
      video: {
        width: window.innerWidth,
      },
    },
  };

  public qrCodeResult: ScannerQRCodeSelectedFiles[] = [];
  public qrCodeResult2: ScannerQRCodeSelectedFiles[] = [];

  @ViewChild('action') action!: NgxScannerQrcodeComponent;

  public percentage = 80;
  public quality = 100;

  constructor(
    private qrcode: NgxScannerQrcodeService,
    private qrService: QrService,
    private translate: TranslateService
  ) {}

  ngAfterViewInit(): void {
    this.action.isReady.subscribe((res: any) => {
      this.handle(this.action, 'start');
    });
  }

  public onEvent(e: ScannerQRCodeResult[], action?: any): void {
    // e && action && action.pause();
    console.log(e);
    this.qrCodeText = e[0].value;
    this.qrCodeTextArray = this.qrCodeText.split('|');
    this.body.qrCodeTextContent = this.qrCodeText;
    this.errorMessage = '';
    if (this.qrCodeText != '') 
      this.enableConfirmButton = true;
  }

  public handle(action: any, fn: string): void {
    const playDeviceFacingBack = (devices: any[]) => {
      // front camera or back camera check here!
      const device = devices.find((f) =>
        /back|rear|environment/gi.test(f.label)
      ); // Default Back Facing Camera
      action.playDevice(device ? device.deviceId : devices[0].deviceId);
    };

    if (fn === 'start') {
      action[fn](playDeviceFacingBack).subscribe(
        (r: any) => console.log(fn, r),
        alert
      );
    } else {
      action[fn]().subscribe((r: any) => console.log(fn, r), alert);
    }
  }

  public onDowload(action: NgxScannerQrcodeComponent) {
    action.download().subscribe(console.log, alert);
  }

  public onSelects(files: any) {
    this.qrcode
      .loadFiles(files, this.percentage, this.quality)
      .subscribe((res: ScannerQRCodeSelectedFiles[]) => {
        this.qrCodeResult = res;
      });
  }

  public onSelects2(files: any) {
    this.qrcode
      .loadFilesToScan(files, this.config, this.percentage, this.quality)
      .subscribe((res: ScannerQRCodeSelectedFiles[]) => {
        console.log(res);
        this.qrCodeResult2 = res;
      });
  }

  public onGetConstraints() {
    const constrains = this.action.getConstraints();
    console.log(constrains);
  }

  public applyConstraints() {
    const constrains = this.action.applyConstraints({
      ...this.action.getConstraints(),
      width: 510,
    });
    console.log(constrains);
  }

  ConfirmSubscriberAttendance() {
    if (this.qrCodeText != '') {
      this.isLoading=true;
      this.qrService.ConfirmSubscriberAttendance(this.body).subscribe(
        (response) => {
          if (response.status_code == 200) {
            console.log('QR Code scanned successfully!', response);
            this.showSuccessMessage = true; // Show success message
            this.qrCodeText = '';
            this.errorMessage = '';
            this.enableConfirmButton = false;
            this.hideSuccessMessageAfterDelay(); // Call the method to hide it after a delay
          } 
          else this.errorMessage = 'Error ';
          this.isLoading=false;
        },
        (error) => {
          console.error('Error in QR Code Scanner :', error);
          this.errorMessage = '';
          this.enableConfirmButton = false;
          if (
            error.error.status_code == 400 &&
            error.error.CustomErrors.length > 0
          ) {
            if (
              error.error.CustomErrors[0].ErrorDescription ==
              'AttendanceAlreadyConfirmed'
            )
              this.translate
                .get('scanner.attendanceAlreadyConfirmed')
                .subscribe((translation: string) => {
                  this.errorMessage = translation;
                });
          }
          this.isLoading=false;
        }
      );
    }
  }

  hideSuccessMessageAfterDelay() {
    setTimeout(() => {
      this.showSuccessMessage = false; // Hide success message after 5 seconds
      this.qrCodeText = '';
    }, 5000); // 5000 milliseconds = 5 seconds
  }
}
