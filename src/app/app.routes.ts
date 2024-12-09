import { Routes } from '@angular/router';
import { inject } from '@angular/core';

import { loginGuard } from './login/login.guard';
import { authGuard } from './guards/auth.guard';
import { adminGuard } from './guards/admin.guard';
import { userGuard } from './guards/user.guard';

import { AuthService } from './services/auth.service';

import { LoginComponent } from './login/login.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [
    { path: 'login', title: 'Login', component: LoginComponent, canActivate: [loginGuard] },
    {
        path: '',
        component: DashboardComponent,
        canActivate: [authGuard],
        children: [
            {
                path: '',
                redirectTo: () => {
                    const authService = inject(AuthService);

                    if (authService.isAdmin()) {
                        return `/admin`;
                    } else {
                        return `/user`;
                    }
                },
                pathMatch: 'full'
            },
            {
                path: 'admin',
                component: AdminDashboardComponent,
                canActivate: [adminGuard],
                title: 'Dashboard',
            },
            {
                path: 'user',
                component: UserDashboardComponent,
                canActivate: [userGuard],
                title: 'Dashboard',
            },
            {
                path: 'details/:id',
                component: UserDetailsComponent,
                canActivate: [adminGuard],
                title: 'Details',
            },
        ]
    },
    { path: '**', component: LoginComponent, canActivate: [loginGuard], },
];
