import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponentComponent } from './login-component/login-component.component'; 
import { authGuard } from './auth/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { BookingHistoryComponent } from './booking-history/booking-history.component';
import { ManagerPanelComponent } from './manager-panel/manager-panel.component';
import { MeetingRoomComponent } from './meeting-room/meeting-room.component';
import { SeatBookingComponent } from './seat-booking/seat-booking.component';
import { ContactManagerComponent } from './contact-manager/contact-manager.component';
const routes: Routes = [
  {path:'login',component:LoginComponentComponent},
  {path:'dashboard',component:DashboardComponent, canActivate:[authGuard]},
  {path:'connect_manager',component:ContactManagerComponent,canActivate:[authGuard]},
  {path:'book_seat',component:SeatBookingComponent,canActivate:[authGuard]},
  {path:'book_meeting_room',component:MeetingRoomComponent,canActivate:[authGuard]},
  {path:'manager_actions',component:ManagerPanelComponent,canActivate:[authGuard]},
  {path:'booking_history',component:BookingHistoryComponent,canActivate:[authGuard]},
  {path:'mark_attendance',component:AttendanceComponent,canActivate:[authGuard]},
  {path:'',redirectTo:'/login',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
