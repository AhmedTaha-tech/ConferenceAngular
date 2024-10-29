import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DashboardLoginService } from '../../../../services/dashboard-login.service';
import { AuthenticationService } from '../../../../services/authentication.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-dashboard-login',
  templateUrl: './dashboard-login.component.html',
  styleUrl: './dashboard-login.component.css',
})
export class DashboardLoginComponent {
  loginForm!: FormGroup;
  errorMessage: string = '';
  isLoading = false;
  selectedLanguage: any = '';

  constructor(
    private fb: FormBuilder,
    private dashboardLoginService: DashboardLoginService,
    private router: Router,
    private auth : AuthenticationService,
    private translate: TranslateService,
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      Username: ['', [Validators.required]],
      Password: ['', [Validators.required]],
    });

    this.selectedLanguage = localStorage.getItem('selectedLanguage');
  const savedLanguage = localStorage.getItem('selectedLanguage');
  if (savedLanguage) {
    this.selectedLanguage = savedLanguage;
    this.translate.use(savedLanguage);
  } else {
    this.translate.setDefaultLang('en');
  }
  const htmlTag = document.documentElement;
  htmlTag.lang = this.selectedLanguage;
  htmlTag.dir = this.selectedLanguage === 'ar' ? 'rtl' : 'ltr';
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading=true;
      this.dashboardLoginService.Login(this.loginForm.value).subscribe(
        (response) => {
          if (response.status_code == 200) {
            console.log('User added successfully!', response);
            this.errorMessage = '';
            this.auth.login(response.data.userName,response.data.token);
            this.router.navigate(['/dashboard/home']);
          }
          this.errorMessage = 'Invalid username or password. Please try again.';
          this.isLoading=false;
        },
        (error) => {
          console.error('Error adding user:', error);
          this.errorMessage = 'Invalid username or password. Please try again.';
          this.isLoading=false;
        }
      );
    }
  }

switchLanguage() {
  // Toggle language
  this.selectedLanguage = this.selectedLanguage === 'ar' ? 'en' : 'ar';

  // Set the selected language in the translate service and localStorage
  this.translate.use(this.selectedLanguage);
  localStorage.setItem('selectedLanguage', this.selectedLanguage);

  // Update HTML lang and direction attributes
  const htmlTag = document.documentElement;
  htmlTag.lang = this.selectedLanguage;
  htmlTag.dir = this.selectedLanguage === 'ar' ? 'rtl' : 'ltr';

  console.log('Language set to =>', this.selectedLanguage);
}

}
