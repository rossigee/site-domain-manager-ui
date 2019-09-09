import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRegistrarComponent } from './create-registrar.component';

describe('CreateRegistrarComponent', () => {
  let component: CreateRegistrarComponent;
  let fixture: ComponentFixture<CreateRegistrarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateRegistrarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateRegistrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
