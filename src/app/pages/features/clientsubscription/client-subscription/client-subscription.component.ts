import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ClientSubscriptionService } from '../../../../services/client-subscription.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client-subscription',
  templateUrl: './client-subscription.component.html',
  styleUrl: './client-subscription.component.css',
})
export class ClientSubscriptionComponent implements OnInit {
  addForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private clientSubscriptService: ClientSubscriptionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.addForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.addForm.valid) {
      this.clientSubscriptService
        .AddConferenceSubscription(this.addForm.value)
        .subscribe(
          (response) => {
            if (response.status_code == 200) {
              console.log('User added successfully!', response);
              this.router.navigate(['/success']);
            } else this.router.navigate(['/error']);
          },
          (error) => {
            console.error('Error adding user:', error);
            this.router.navigate(['/error']);
          }
        );
    } else this.checkFormErrors();
  }

  checkFormErrors() {
    Object.keys(this.addForm.controls).forEach((key) => {
      const controlErrors = this.addForm.get(key)?.errors;
      if (controlErrors) {
        console.log(`Error in ${key}:`, controlErrors);
      }
    });
  }
}
