import { Component, Input } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-i',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgIf],
  template: `
    <div [formGroup]="formGroup">
      <input *ngIf="check" type="checkbox" checked="checked" class="checkbox" />
      <label for="fieldName">{{ labelName }}:</label>
      <input id="fieldName" type="text" formControlName="{{ fieldName }}" />
    </div>
  `,
  styles: [],
})
export class IComponent {
  @Input() fieldName!: String;
  @Input() labelName!: String;
  @Input() formGroup!: FormGroup;
  @Input() check!: boolean;
}
