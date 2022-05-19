import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormedicionComponent } from './formedicion.component';

describe('FormedicionComponent', () => {
  let component: FormedicionComponent;
  let fixture: ComponentFixture<FormedicionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormedicionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormedicionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
