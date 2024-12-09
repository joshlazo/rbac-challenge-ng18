import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AsyncPipe, NgIf } from '@angular/common';
import { Observable } from 'rxjs';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

import { AdminService } from '../services/admin.service';

@Component({
  selector: 'cp-user-details',
  standalone: true,
  imports: [
    AsyncPipe,
    NgIf,
    MatProgressSpinner,
  ],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss'
})
export class UserDetailsComponent implements OnInit {
  id: string = '';
  user$!: Observable<any>;

  constructor(
    private route: ActivatedRoute,
    private adminService: AdminService,
    private router: Router,
  ) {
    this.id = String(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    this.user$ = this.getUser(this.id);
  }

  getUser(id: string) {
    return this.adminService.getUserById(this.id);
  }

  deleteUser(id: string) {
    console.log(id);
    this.adminService.deleteUser(this.id);
    this.router.navigate(['admin']);
  }

  goBack() {
    this.router.navigate(['admin']);
  }
}
