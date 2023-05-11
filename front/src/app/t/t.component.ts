import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-t',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="navbar bg-slate-900 flex justify-center">
      <a class="btn btn-ghost normal-case text-xl text-sky-600">Notification Form</a>
    </div>
  `,
  styles: [],
})
export class TComponent {}
