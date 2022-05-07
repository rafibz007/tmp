import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomatesListComponent } from './roomates-list.component';

describe('RoomatesListComponent', () => {
  let component: RoomatesListComponent;
  let fixture: ComponentFixture<RoomatesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoomatesListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomatesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
