import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WafComponent } from './waf.component';

describe('WafComponent', () => {
  let component: WafComponent;
  let fixture: ComponentFixture<WafComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WafComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WafComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
