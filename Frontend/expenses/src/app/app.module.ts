import {ChangeDetectorRef, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './components/pages/home-page/home-page.component';
import { RoomPageComponent } from './components/pages/room-page/room-page.component';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';
import { LoginFormComponent } from './components/login/login-form/login-form.component';
import { RegisterFormComponent } from './components/login/register-form/register-form.component';
import { RoomListComponent } from './components/home/room-list/room-list.component';
import { FriendListComponent } from './components/home/friend-list/friend-list.component';
import { RoomInvitationListComponent } from './components/home/room-invitation-list/room-invitation-list.component';
import { RoomCreationFormComponent } from './components/home/room-creation-form/room-creation-form.component';
import { FriendInvitationFormComponent } from './components/home/friend-invitation-form/friend-invitation-form.component';
import { NavbarComponent } from './components/nav/navbar/navbar.component';
import { AvatarComponent } from './components/nav/avatar/avatar.component';
import { ExpenseListComponent } from './components/room/expense-list/expense-list.component';
import { RoomatesListComponent } from './components/room/roomates-list/roomates-list.component';
import { BalanceComponent } from './components/room/balance/balance.component';
import { TransferListComponent } from './components/room/transfer-list/transfer-list.component';
import { ExpenseFormComponent } from './components/room/expense-form/expense-form.component';
import { TransferFormComponent } from './components/room/transfer-form/transfer-form.component';
import { InvitationFormComponent } from './components/room/invitation-form/invitation-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http";
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { AuthService } from './services/auth.service';


@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    RoomPageComponent,
    LoginPageComponent,
    LoginFormComponent,
    RegisterFormComponent,
    RoomListComponent,
    FriendListComponent,
    RoomInvitationListComponent,
    RoomCreationFormComponent,
    FriendInvitationFormComponent,
    NavbarComponent,
    AvatarComponent,
    ExpenseListComponent,
    RoomatesListComponent,
    BalanceComponent,
    TransferListComponent,
    ExpenseFormComponent,
    TransferFormComponent,
    InvitationFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS, useClass:AuthInterceptor, multi:true},
    HttpClient,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
