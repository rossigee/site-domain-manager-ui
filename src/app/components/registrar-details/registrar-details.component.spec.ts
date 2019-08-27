import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarDetailsComponent } from './registrar-details.component';

describe('RegistrarDetailsComponent', () => {
  let component: RegistrarDetailsComponent;
  let fixture: ComponentFixture<RegistrarDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrarDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrarDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
