import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DomainDetailsDNSComponent } from './domain-details-dns.component';

describe('DomainDetailsDNSComponent', () => {
  let component: DomainDetailsDNSComponent;
  let fixture: ComponentFixture<DomainDetailsDNSComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DomainDetailsDNSComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DomainDetailsDNSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
