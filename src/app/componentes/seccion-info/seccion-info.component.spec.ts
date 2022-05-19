import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeccionInfoComponent } from './seccion-info.component';

describe('SeccionInfoComponent', () => {
  let component: SeccionInfoComponent;
  let fixture: ComponentFixture<SeccionInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeccionInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeccionInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
