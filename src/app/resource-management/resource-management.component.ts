import { Component, EventEmitter, Input, input, OnInit, Output, output } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

import { UserService } from '../services/user.service';

@Component({
  selector: 'cp-resource-management',
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule,
  ],
  templateUrl: './resource-management.component.html',
  styleUrl: './resource-management.component.scss'
})
export class ResourceManagementComponent implements OnInit {
  @Input({ required: true }) details: any;
  @Output() panelClosed = new EventEmitter<void>();

  resourceForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.resourceForm = this.fb.group({
      id: [this.details.id, Validators.required],
      name: [this.details.name, Validators.required],
      year: [this.details.year, [Validators.required, Validators.pattern(/^\d+$/)]],
      color: [this.details.color, [Validators.required, Validators.pattern(/^#/)]],
      pantone_value: [this.details.pantone_value, Validators.required],
    })
  }

  onSubmit() {
    console.log('this.resourceForm.value :>> ', this.resourceForm.value);

    if (this.resourceForm.invalid) {
      console.log('no lusot');
      this.markAllAsTouched(this.resourceForm);
    } else {
      console.log("what?");

      this.userService.updateResource(this.resourceForm.value);
      this.panelClosed.emit();
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
}
