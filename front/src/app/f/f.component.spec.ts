import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FComponent } from './f.component';

describe('FComponent', () => {
  let component: FComponent;
  let fixture: ComponentFixture<FComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FComponent]
    });
    fixture = TestBed.createComponent(FComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
