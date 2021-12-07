import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarApunteComponent } from './editar-apunte.component';

describe('EditarApunteComponent', () => {
  let component: EditarApunteComponent;
  let fixture: ComponentFixture<EditarApunteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarApunteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarApunteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
