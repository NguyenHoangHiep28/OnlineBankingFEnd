import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogLockedComponent } from './dialog-locked.component';

describe('DialogLockedComponent', () => {
  let component: DialogLockedComponent;
  let fixture: ComponentFixture<DialogLockedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogLockedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogLockedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
