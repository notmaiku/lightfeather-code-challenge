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
    <div *ngIf="data(); else error" class="p-20">
      <form
        [formGroup]="superForm"
        class="grid grid-cols-2 gap-4 justify-items-center"
      >
        <ng-container *ngFor="let input of inputs">
          <div class="mb-4j w-1/3">
            <app-i
              [check]="input.check"
              [formGroup]="superForm"
              [fieldName]="input.fieldName"
              [labelName]="input.labelName"
            ></app-i>
          </div>
        </ng-container>
        <div class="mb-4 col-span-2 text-center flex flex-col items-center">
          <label for="supervisor">Supervisor</label>
          <select
            class="select select-bordered w-full max-w-xs"
            formControlName="supervisor"
          >
            <option disabled selected value="">Select one</option>
            <ng-container *ngFor="let name of supervisors">
              <option>{{ name }}</option>
            </ng-container>
          </select>
        </div>
        <div class="mb-4 col-span-2 text-center">
          <button class="btn" type="submit" (click)="onSubmit()">Submit</button>
        </div>
      </form>
      <div *ngIf="resp" class="text-center">
        <p>{{ resp.message }}</p>
        <p>{{ resp[0] }}</p>
      </div>
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
  inputs: any = [
    { labelName: 'First Name', fieldName: 'firstName', check: false },
    { labelName: 'Last Name', fieldName: 'lastName', check: false },
    { labelName: 'Email', fieldName: 'email', check: true },
    { labelName: 'Phone Number', fieldName: 'phoneNumber', check: true },
  ];
  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.superForm = this.fb.group({
      firstName: '',
      lastName: '',
      email: '',
      emailCheck: '',
      phoneNumber: '',
      phoneCheck: '',
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
    resp.subscribe((data) => this.handleResponse(data));
  }

  handleResponse(resp: any) {
    this.resp = resp;
    if ('message' in resp) {
      this.superForm.reset();
    }
    if (resp.length) {
      resp[0] =
        resp[0] +
        `Make sure these fields are included 
        1. firstName
        2. lastName
        3. email
        4. phoneNumber
        5. Supervisor`;
    }
  }
}
