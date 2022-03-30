import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReprotComponent } from './reprot.component';

describe('ReprotComponent', () => {
  let component: ReprotComponent;
  let fixture: ComponentFixture<ReprotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReprotComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReprotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
