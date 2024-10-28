import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { GetClientsSubscribed } from '../../../../model/dashboard/GetClientsSubscribed';
import { DashboardHomeService } from '../../../../services/dashboard-home.service';
import { UtilityService } from '../../../../services/utility.service';

@Component({
  selector: 'app-subscribers',
  templateUrl: './subscribers.component.html',
  styleUrl: './subscribers.component.css'
})
export class SubscribersComponent  {
  searchForm: FormGroup;
  selectedLanguage: any = '';
  displayedColumns: string[] = [
    'firstName',
    'lastName',
    'email',
    'phoneNumber',
    'createdAt',
    'attendance'
  ];
  isCollapsed: boolean = false;

  toggleAside() {
    this.isCollapsed = !this.isCollapsed;
  }
  dataSource = new MatTableDataSource<GetClientsSubscribed>([]);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  totalRecords = 0;
  pageSize: number = 5;
  subscriptions: Subscription[] = [];

  pageEvent: PageEvent;

  constructor(
    private dashboardhomeService: DashboardHomeService,
    private fb: FormBuilder,
    private utility: UtilityService,
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

      const htmlTag = document.documentElement;
      htmlTag.lang = this.selectedLanguage;
      htmlTag.dir = this.selectedLanguage === 'ar' ? 'rtl' : 'ltr';

    }
  }

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      firstName: [null],
      lastName: [null],
      email: [null],
      phoneNumber: [null],
      createdAt: [null],
      attendance:[null]
    });
    this.fetchData(0, 10, null, null, null, null, null,null); // Initial fetch with first page and page size 10
  }

  fetchData(
    pageIndex: number,
    pageSize: number,
    firstName?: string | null,
    lastName?: string | null,
    email?: string | null,
    phoneNumber?: string | null,
    createdAt?: string | null,
    attendance?: string | null
  ): void {
    this.subscriptions.push(
      this.dashboardhomeService
        .GetClientsSubscribed(
          pageIndex,
          pageSize,
          firstName,
          lastName,
          email,
          phoneNumber,
          createdAt,
          attendance
        )
        .subscribe(
          (response) => {
            this.dataSource = new MatTableDataSource(response.data);
            this.totalRecords = response.totaRecords;
            this.dataSource.paginator = this.paginator;
          },
          (error) => {
            console.error('Error fetching data from API', error);
          }
        )
    );
  }

  onPaginateChange(event: any): void {
    debugger;
    const searchCriteria = this.searchForm.value;
    this.fetchData(
      event.pageIndex + 1,
      event.pageSize,
      searchCriteria.firstName,
      searchCriteria.lastName,
      searchCriteria.email,
      searchCriteria.createdAt,
      searchCriteria.phoneNumber,
      searchCriteria.attendance
    );
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  onSearchForm(): void {
    if (this.searchForm.valid) {
      const searchCriteria = this.searchForm.value;
      const preparedData = this.utility.prepareFormData(searchCriteria);
      console.log('Search criteria:', searchCriteria);
      this.fetchData(
        0,
        10,
        preparedData.firstName,
        preparedData.lastName,
        preparedData.email,
        preparedData.phoneNumber,
        preparedData.createdAt,
        preparedData.attendance
      );
      // const filterValue = this.searchForm.value;
      // this.dataSource.filter = JSON.stringify(filterValue);
    }
  }
  exportToPDF() {
    if (this.searchForm.valid) {
      const searchCriteria = this.searchForm.value;
      const preparedData = this.utility.prepareFormData(searchCriteria);
      console.log('Search criteria:', searchCriteria);
      this.GetClientsSubscribedReport(
        preparedData.firstName,
        preparedData.lastName,
        preparedData.email,
        preparedData.phoneNumber,
        preparedData.createdAt
      );
    }
  }
  Logout(){
    this.router.navigate(['']);
  }
  switchLanguage(lang: string) {
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
  GetClientsSubscribedReport(
    firstName?: string | null,
    lastName?: string | null,
    email?: string | null,
    phoneNumber?: string | null,
    createdAt?: string | null
  ): void {
    this.subscriptions.push(
      this.dashboardhomeService
        .GetClientsSubscribedReport(
          firstName,
          lastName,
          email,
          phoneNumber,
          createdAt
        )
        .subscribe(
          (response) => {
            // Convert the Base64 string to a binary string
            const byteCharacters = atob(response.data.reportBytes);

            // Create an array of bytes from the binary string
            const byteNumbers = new Array(byteCharacters.length);
            for (let i = 0; i < byteCharacters.length; i++) {
              byteNumbers[i] = byteCharacters.charCodeAt(i);
            }

            // Convert the array of bytes into a typed array (Uint8Array)
            const byteArray = new Uint8Array(byteNumbers);

            // Create a blob object representing the PDF file
            const blob = new Blob([byteArray], { type: 'application/pdf' });

            // Create a download link for the blob
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'report.pdf';
            a.click();

            // Clean up the object URL after the download
            window.URL.revokeObjectURL(url);
          },
          (error) => {
            console.error('Error fetching data from API', error);
          }
        )
    );
  }
  
  resetForm(): void {
    this.searchForm.reset(); // يعيد تعيين النموذج لحالته الافتراضية
  }
}