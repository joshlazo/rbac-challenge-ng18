import { Component, OnInit } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'cp-dashboard',
  standalone: true,
  imports: [
    RouterOutlet
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  constructor(
    private router: Router,
    private authService: AuthService,
  ) { }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
