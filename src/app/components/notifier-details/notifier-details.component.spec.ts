import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotifierDetailsComponent } from './notifier-details.component';

describe('NotifierDetailsComponent', () => {
  let component: NotifierDetailsComponent;
  let fixture: ComponentFixture<NotifierDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotifierDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotifierDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
