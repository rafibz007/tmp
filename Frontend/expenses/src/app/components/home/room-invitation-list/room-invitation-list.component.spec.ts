import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomInvitationListComponent } from './room-invitation-list.component';

describe('RoomInvitationListComponent', () => {
  let component: RoomInvitationListComponent;
  let fixture: ComponentFixture<RoomInvitationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoomInvitationListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomInvitationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
