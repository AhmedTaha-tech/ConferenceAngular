import { Component, ElementRef, ViewChild } from '@angular/core';
import { QrService } from '../../../../services/qr.service';
import { BrowserMultiFormatReader } from '@zxing/browser';

@Component({
  selector: 'app-qr-scanner',
  templateUrl: './qr-scanner.component.html',
  styleUrl: './qr-scanner.component.css'
})
export class QrScannerComponent {
  @ViewChild('video') videoElement!: ElementRef<HTMLVideoElement>;
  @ViewChild('canvas') canvasElement!: ElementRef<HTMLCanvasElement>;
  qrResult: string | null = null;
  errorMessage: string | null = null;
  qrCodeText: string | null = null;
  showSuccessMessage = false;

  private codeReader: BrowserMultiFormatReader;
  public scannedResult: string;
  public imageCaptured: boolean = false; // Flag to track image capture

  constructor(private qrService: QrService) {
    this.codeReader = new BrowserMultiFormatReader();
  }

  ngOnInit() {
    this.startCamera();
    this.startScanning();
  }

  startScanning() {
    const context = this.canvasElement.nativeElement.getContext('2d');
    if (context) {
      context.drawImage(this.videoElement.nativeElement, 0, 0, this.canvasElement.nativeElement.width, this.canvasElement.nativeElement.height);
      this.canvasElement.nativeElement.toBlob((blob) => {
        if (blob) {
          this.qrService
            .decodeFromBlob(blob)
            .then((text) => {
              this.qrCodeText = text;
              this.body.qrCodeTextContent = this.qrCodeText;
            });
        }
      });
    }
  }

  startCamera() {
    navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
      .then((stream) => {
        this.videoElement.nativeElement.srcObject = stream;
        this.videoElement.nativeElement.play();
      })
      .catch((error) => {
        this.errorMessage = "Cannot access the camera.";
        console.error("Camera error: ", error);
      });
  }
  body = {
    qrCodeTextContent: this.qrCodeText,
  };
  captureImage() {
    const context = this.canvasElement.nativeElement.getContext('2d');
    if (context) {
      context.drawImage(this.videoElement.nativeElement, 0, 0, this.canvasElement.nativeElement.width, this.canvasElement.nativeElement.height);
      this.canvasElement.nativeElement.toBlob((blob) => {
        if (blob) {
          this.qrService
            .decodeFromBlob(blob)
            .then((text) => {
              this.qrCodeText = text;
              this.body.qrCodeTextContent = this.qrCodeText;
              this.showSuccessMessage = true; // Show success message
            });
        }
      });
    }
  }


  ConfirmSubscriberAttendance() {
    if (this.qrCodeText != '') {
      this.qrService.ConfirmSubscriberAttendance(this.body).subscribe(
        (response) => {
          if (response.status_code == 200) {
            console.log('User added successfully!', response);
            this.showSuccessMessage = true; // Show success message
            this.hideSuccessMessageAfterDelay(); // Call the method to hide it after a delay
          }
        },
        (error) => {
          console.error('Error adding user:', error);
        }
      );
    }
  }

  hideSuccessMessageAfterDelay() {
    setTimeout(() => {
      this.showSuccessMessage = false; // Hide success message after 5 seconds
      this.qrCodeText=''
    }, 5000); // 5000 milliseconds = 5 seconds
  }
}
