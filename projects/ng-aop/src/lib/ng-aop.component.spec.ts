import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgAopComponent } from './ng-aop.component';

describe('NgAopComponent', () => {
  let component: NgAopComponent;
  let fixture: ComponentFixture<NgAopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgAopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgAopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
