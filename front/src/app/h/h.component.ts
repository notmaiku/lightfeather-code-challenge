import { Component, effect } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { takeUntil } from 'rxjs/operators';
import { ReplaySubject } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { FComponent } from '../f/f.component';

@Component({
  selector: 'app-h',
  standalone: true,
  imports: [CommonModule, NgFor, HttpClientModule, FComponent],
  template: ` <app-f /> `,
  styles: [],
})
export class HComponent {}
