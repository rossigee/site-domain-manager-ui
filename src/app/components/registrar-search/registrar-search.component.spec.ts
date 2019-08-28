import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarSearchComponent } from './registrar-search.component';

describe('RegistrarSearchComponent', () => {
  let component: RegistrarSearchComponent;
  let fixture: ComponentFixture<RegistrarSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrarSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrarSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
