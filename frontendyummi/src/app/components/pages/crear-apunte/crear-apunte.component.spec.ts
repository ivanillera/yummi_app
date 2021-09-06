import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearApunteComponent } from './crear-apunte.component';

describe('CrearApunteComponent', () => {
  let component: CrearApunteComponent;
  let fixture: ComponentFixture<CrearApunteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearApunteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearApunteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
