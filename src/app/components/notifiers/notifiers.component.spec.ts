import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotifiersComponent } from './notifiers.component';

describe('NotifiersComponent', () => {
  let component: NotifiersComponent;
  let fixture: ComponentFixture<NotifiersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotifiersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotifiersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
