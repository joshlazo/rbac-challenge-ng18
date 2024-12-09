import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AsyncPipe, NgIf } from '@angular/common';
import { Router } from '@angular/router';

import { AdminService } from '../services/admin.service';

@Component({
  selector: 'cp-admin-dashboard',
  standalone: true,
  imports: [
    AsyncPipe,
    NgIf,
  ],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss',
})
export class AdminDashboardComponent {
  users$!: Observable<any>;

  constructor(
    private adminService: AdminService,
    private router: Router,
  ) {
    this.users$ = this.adminService.getUsers();
  }

  navigateToDetails(id: string) {
    this.router.navigate([`/details/${id}`])
  }

  switchPage(page: any) {
    this.adminService.getUsersData(page);
  }
}
