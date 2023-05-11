import { Component, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IComponent } from '../i/i.component';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { ReplaySubject, of, takeUntil, catchError } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-f',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, IComponent],
  template: `
    <div *ngIf="data(); else error">
      <form [formGroup]="superForm" class="flex flex-col">
        <app-i
          [check]="false"
          [formGroup]="superForm"
          [fieldName]="'firstName'"
          [labelName]="'First Name'"
        />
        <app-i
          [check]="false"
          [formGroup]="superForm"
          [fieldName]="'lastName'"
          [labelName]="'Last Name'"
        />
        <app-i
          [check]="true"
          [formGroup]="superForm"
          [fieldName]="'email'"
          [labelName]="'Email'"
        />
        <app-i
          [check]="true"
          [formGroup]="superForm"
          [fieldName]="'phoneNumber'"
          [labelName]="'Phone Number'"
        />
        <select
          class="select select-bordered w-full max-w-xs"
          formControlName="supervisor"
        >
          <ng-container *ngFor="let name of supervisors">
            <option>{{ name }}</option>
          </ng-container>
        </select>
        <div>
          <button class="btn" type="submit" (click)="onSubmit()">Button</button>
        </div>
      </form>
    </div>
    <ng-template #error>
      <p>Spinner ...</p>
    </ng-template>
  `,
  styles: [],
})
export class FComponent {
  superForm!: FormGroup;
  resp: any;
  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.superForm = this.fb.group({
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      supervisor: '',
    });

    effect(() => {
      this.supervisors = this.data();
    });
  }

  destroyed$ = new ReplaySubject<void>(1);

  data$ = this.http
    .get('http://localhost:8080/api/supervisors')
    .pipe(takeUntil(this.destroyed$));
  data = toSignal(this.data$);
  supervisors: any;

  ngOnDestroy() {
    this.destroyed$.next();
  }
  onSubmit() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Request-Method': 'GET, POST, PUT',
      'Access-Control-Request-Headers': 'Content-Type',
    });
    let resp = this.http
      .post<any>('http://localhost:8080/api/submit', this.superForm.value, {
        headers,
      })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Error submitting notification:', error);
          return of(['Error submitting notification', error]);
        })
      );
    resp.subscribe(
      (data) => { this.resp = data; });
  }
}
