import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientSubscriptionService } from '../../../../services/client-subscription.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client-subscription',
  templateUrl: './client-subscription.component.html',
  styleUrls: ['./client-subscription.component.css'],
})
export class ClientSubscriptionComponent implements OnInit {
  addForm!: FormGroup;

  // List of countries with their dial codes and flags
  countries = [
    {
      name: 'Saudi',
      dialCode: '+996',
      flag: 'assets/flags/saudi-arabia-flag-icon.svg',
    },
    {
      name: 'United States',
      dialCode: '+1',
      flag: 'https://flagcdn.com/us.svg',
    },
    {
      name: 'United Kingdom',
      dialCode: '+44',
      flag: 'https://flagcdn.com/gb.svg',
    },

    // Add more countries here
  ];

  selectedCountryCode: string = this.countries[0].dialCode; // Default selected country code

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
      countryCode: [this.selectedCountryCode, Validators.required],
      phoneNumber: ['', Validators.required],
    });

    // Listen for country code changes
    this.addForm.get('countryCode')?.valueChanges.subscribe((code) => {
      this.selectedCountryCode = code;
    });
  }

  onSubmit() {
    if (this.addForm.valid) {
      // Combine country code with phone number before sending the request
      const formValue = this.addForm.value;
      formValue.phoneNumber = this.selectedCountryCode + formValue.phoneNumber;

      this.clientSubscriptService
        .AddConferenceSubscription(formValue)
        .subscribe(
          (response) => {
            if (response.status_code === 200) {
              console.log('User added successfully!', response);
              this.router.navigate(['/success']);
            } else {
              this.router.navigate(['/error']);
            }
          },
          (error) => {
            console.error('Error adding user:', error);
            this.router.navigate(['/error']);
          }
        );
    } else {
      this.checkFormErrors();
    }
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
