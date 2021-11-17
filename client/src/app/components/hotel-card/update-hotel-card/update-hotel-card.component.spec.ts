import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateHotelCardComponent } from './update-hotel-card.component';

describe('UpdateHotelCardComponent', () => {
  let component: UpdateHotelCardComponent;
  let fixture: ComponentFixture<UpdateHotelCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateHotelCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateHotelCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
