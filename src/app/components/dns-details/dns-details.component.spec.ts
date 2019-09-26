import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DnsDetailsComponent } from './dns-details.component';

describe('DnsDetailsComponent', () => {
  let component: DnsDetailsComponent;
  let fixture: ComponentFixture<DnsDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DnsDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DnsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
