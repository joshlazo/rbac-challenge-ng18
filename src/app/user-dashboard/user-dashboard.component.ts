import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AsyncPipe, NgFor, NgIf, TitleCasePipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

import { UserService } from '../services/user.service';

import { ResourceManagementComponent } from '../resource-management/resource-management.component';

@Component({
  selector: 'cp-user-dashboard',
  standalone: true,
  imports: [
    AsyncPipe,
    TitleCasePipe,
    NgIf,
    ReactiveFormsModule,
    ResourceManagementComponent,
  ],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.scss'
})
export class UserDashboardComponent {
  resources$!: Observable<any>;
  resourceForm!: FormGroup;

  selectedItemId: number | null = null;
  isAddFormVisible: boolean = false;

  constructor(
    private userService: UserService,
    private router: Router,
    private fb: FormBuilder,
  ) {
    this.resources$ = this.userService.getResources();
  }

  ngOnInit(): void {
    this.resourceForm = this.fb.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      year: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      color: ['', [Validators.required, Validators.pattern(/^#/)]],
      pantone_value: ['', Validators.required],
    })
  }


  onSubmit() {
    if (this.resourceForm.invalid) {
      this.markAllAsTouched(this.resourceForm);
    } else {
      this.userService.addResource(this.resourceForm.value);
      this.toggleAddForm();
    }
  }

  private markAllAsTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markAllAsTouched(control);
      }
    });
  }

  deleteResource(id: any) {
    this.userService.deleteResource(id);
  }

  navigateToDetails(id: string) {
    this.router.navigate([`/details/${id}`])
  }

  switchPage(page: any) {
    this.userService.getResourcesData(page);
  }

  switchToZero(event: any) {
      this.selectedItemId = null;
  }

  onEditClick(item: any) {
    this.selectedItemId = this.selectedItemId === item.id ? null : item.id;
  }

  toggleAddForm() {
    this.resourceForm.reset();

    if (!this.isAddFormVisible)
      this.isAddFormVisible = !this.isAddFormVisible;
    else
      this.isAddFormVisible = !this.isAddFormVisible;
  }
}
