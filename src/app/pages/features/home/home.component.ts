import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  selectedLanguage: any = '';
  constructor(private translate: TranslateService) {}
  ngOnInit(): void {
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
