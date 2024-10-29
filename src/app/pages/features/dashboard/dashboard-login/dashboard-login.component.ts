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
  constructor(
    private fb: FormBuilder,
    private dashboardLoginService: DashboardLoginService,
    private router: Router,
    private auth : AuthenticationService,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      Username: ['', [Validators.required]],
      Password: ['', [Validators.required]],
    });
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
}
