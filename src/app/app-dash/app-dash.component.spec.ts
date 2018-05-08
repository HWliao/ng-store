
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppDashComponent } from './app-dash.component';

describe('AppDashComponent', () => {
  let component: AppDashComponent;
  let fixture: ComponentFixture<AppDashComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AppDashComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
