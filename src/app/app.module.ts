import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponentComponent } from './login-component/login-component.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SeatBookingComponent } from './seat-booking/seat-booking.component';
import { MeetingRoomComponent } from './meeting-room/meeting-room.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { BookingHistoryComponent } from './booking-history/booking-history.component';
import { ManagerPanelComponent } from './manager-panel/manager-panel.component';
import { ContactManagerComponent } from './contact-manager/contact-manager.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponentComponent,
    DashboardComponent,
    SeatBookingComponent,
    MeetingRoomComponent,
    AttendanceComponent,
    BookingHistoryComponent,
    ManagerPanelComponent,
    ContactManagerComponent,
    NavigationBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
