import { Component, OnInit, ViewChild } from '@angular/core';
import { DashboardHomeService } from '../../../../services/dashboard-home.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GetClientsSubscribed } from '../../../../model/dashboard/GetClientsSubscribed';
import { Subscription } from 'rxjs';
import { UtilityService } from '../../../../services/utility.service';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrl: './dashboard-home.component.css',
})
export class DashboardHomeComponent implements OnInit {
  searchForm: FormGroup;
  displayedColumns: string[] = [
    'firstName',
    'lastName',
    'email',
    'phoneNumber',
    'createdAt',
  ];
  dataSource = new MatTableDataSource<GetClientsSubscribed>([]);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  totalRecords = 0;
  pageSize: number = 5;
  subscriptions: Subscription[] = [];

  pageEvent: PageEvent;

  constructor(
    private dashboardhomeService: DashboardHomeService,
    private fb: FormBuilder,
    private utility: UtilityService
  ) {}

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      firstName: [null],
      lastName: [null],
      email: [null],
      phoneNumber: [null],
      createdAt: [null],
    });
    this.fetchData(0, 10, null, null, null, null, null); // Initial fetch with first page and page size 10
  }

  fetchData(
    pageIndex: number,
    pageSize: number,
    firstName?: string | null,
    lastName?: string | null,
    email?: string | null,
    phoneNumber?: string | null,
    createdAt?: string | null
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
          createdAt
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
      searchCriteria.phoneNumber
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
        preparedData.createdAt
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
}
