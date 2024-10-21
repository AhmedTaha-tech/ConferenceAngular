import { Component, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-client-subscription',
  templateUrl: './client-subscription.component.html',
  styleUrl: './client-subscription.component.css'
})
export class ClientSubscriptionComponent {
  userName: string = '';
  userEmail: string = '';
  @ViewChild('subscribeDialog') subscribeDialog!: TemplateRef<any>;

  constructor(private dialog: MatDialog) {}

  // Method to open the subscription dialog
  subscribe() {
    const dialogRef = this.dialog.open(this.subscribeDialog);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Handle subscription logic
        console.log('User subscribed:', this.userName, this.userEmail);
      }
    });
  }

  // Method to close dialog
  closeDialog() {
    this.dialog.closeAll();
  }

  // Method to confirm subscription
  confirmSubscription() {
    // Add your subscription logic here
    console.log('Subscribed:', this.userName, this.userEmail);
    this.dialog.closeAll();
  }
}