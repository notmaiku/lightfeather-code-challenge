import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { TComponent } from './t/t.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, TComponent],
  template: `
    <app-t/>
    <router-outlet></router-outlet>
  `,
  styles: [],
})
export class AppComponent {
  title = 'front';
}
