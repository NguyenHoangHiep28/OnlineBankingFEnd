import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSavingComponent } from './list-saving.component';

describe('ListSavingComponent', () => {
  let component: ListSavingComponent;
  let fixture: ComponentFixture<ListSavingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListSavingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListSavingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
