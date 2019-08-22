import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DomainSearchComponent } from './domain-search.component';

describe('DomainSearchComponent', () => {
  let component: DomainSearchComponent;
  let fixture: ComponentFixture<DomainSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DomainSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DomainSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
