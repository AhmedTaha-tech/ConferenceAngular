import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientSubscriptionService } from '../../../../services/client-subscription.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

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
  selectedLanguage: any = '';
  constructor(
    private fb: FormBuilder,
    private clientSubscriptService: ClientSubscriptionService,
    private router: Router,
    private translate: TranslateService
  ) {
    this.selectedLanguage = localStorage.getItem('selectedLanguage');
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage) {
      this.selectedLanguage = savedLanguage;
      this.translate.use(savedLanguage);
    } else {
      this.translate.setDefaultLang('en');
    }
  }

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
              this.router.navigate(['/clientsubscription/success']);
            } else {
              this.router.navigate(['/clientsubscription/error']);
            }
          },
          (error) => {
            console.error('Error adding user:', error);
            this.router.navigate(['/clientsubscription/error']);
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

  switchLanguage(lang: string) {
    this.translate.use(lang);
    this.selectedLanguage = lang == 'ar' ? 'en' : 'ar';
    this.translate.use(this.selectedLanguage);
    localStorage.setItem('selectedLanguage', this.selectedLanguage);
    console.log('lang => ', this.selectedLanguage);
  }
}
