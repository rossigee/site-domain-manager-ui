import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DomainDetailsRegistrarComponent } from './domain-details-registrar.component';

describe('DomainDetailsRegistrarComponent', () => {
  let component: DomainDetailsRegistrarComponent;
  let fixture: ComponentFixture<DomainDetailsRegistrarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DomainDetailsRegistrarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DomainDetailsRegistrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
