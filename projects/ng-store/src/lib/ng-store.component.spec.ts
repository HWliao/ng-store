import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgStoreComponent } from './ng-store.component';

describe('NgStoreComponent', () => {
  let component: NgStoreComponent;
  let fixture: ComponentFixture<NgStoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgStoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
