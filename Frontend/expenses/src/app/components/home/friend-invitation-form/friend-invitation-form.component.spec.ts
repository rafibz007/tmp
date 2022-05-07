import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendInvitationFormComponent } from './friend-invitation-form.component';

describe('FriendInvitationFormComponent', () => {
  let component: FriendInvitationFormComponent;
  let fixture: ComponentFixture<FriendInvitationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FriendInvitationFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendInvitationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
