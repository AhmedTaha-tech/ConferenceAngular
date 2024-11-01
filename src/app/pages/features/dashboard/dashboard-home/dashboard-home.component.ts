import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { SubscribersComponent } from '../subscribers/subscribers.component';
import { QrScannerComponent } from '../qr-scanner/qr-scanner.component';
import { AuthenticationService } from '../../../../services/authentication.service';
import { LocalStorageService } from '../../../../services/local-storage.service';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrl: './dashboard-home.component.css',
})
export class DashboardHomeComponent implements OnInit {
  componentType: any; // Variable to hold the child component type
  selectedLanguage: any = '';
  isCollapsed: boolean = false;
  userFullName:string='';
  componentMap = {
    subscribers: SubscribersComponent,
    scanner: QrScannerComponent,
  };

  constructor(
    private router: Router,
    private translate: TranslateService,
    private route: ActivatedRoute,
    private auth : AuthenticationService,
    private localStorage:LocalStorageService
  ) {}

  ngOnInit() {
    this.userFullName= this.localStorage.retrieveFirstNameFromLocalStorage() + ' ' + this.localStorage.retrieveLastNameFromLocalStorage();
    
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

    // this.componentType = SubscribersComponent; // Set the component type to ChildComponent
    this.route.params.subscribe((params) => {
      let componentName = params['componentName'];
      if(componentName=='home') 
        componentName='subscribers';
      this.setComponent(componentName); // Set the component type based on the route parameter
    });
  }

  setComponent(componentName: string) {
    this.componentType = this.componentMap[componentName]; // Set the component type based on the name
  }
  toggleAside() {
    this.isCollapsed = !this.isCollapsed;
  }
  Logout() {
    this.auth.logout();
    this.router.navigate(['']);
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
