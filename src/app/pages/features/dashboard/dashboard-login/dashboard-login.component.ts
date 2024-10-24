import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DashboardLoginService } from '../../../../services/dashboard-login.service';

@Component({
  selector: 'app-dashboard-login',
  templateUrl: './dashboard-login.component.html',
  styleUrl: './dashboard-login.component.css',
})
export class DashboardLoginComponent {
  loginForm!: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private dashboardLoginService: DashboardLoginService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.dashboardLoginService.Login(this.loginForm.value).subscribe(
        (response) => {
          if (response.status_code == 200) {
            console.log('User added successfully!', response);
            this.errorMessage = '';
            this.router.navigate(['/dashoardhome']);
          }
          this.errorMessage = 'Invalid username or password. Please try again.';
        },
        (error) => {
          console.error('Error adding user:', error);
          this.errorMessage = 'Invalid username or password. Please try again.';
        }
      );
    }
  }
}
