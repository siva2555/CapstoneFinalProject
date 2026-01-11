import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ResidentComponent } from './resident/resident.component';
import { AdminComponent } from './admin/admin.component';
import { WorkerComponent } from './worker/worker.component';
import { VisitorComponent } from './visitor/visitor.component';
import { NoticeComponent } from './notice/notice.component';
import { BookingComponent } from './booking/booking.component';
import { RegisterComponent } from './register/register.component';
import { ApartmentComponent } from './apartment/apartment.component';
import { ComplaintComponent } from './complaint/complaint.component';
import { ComplaintStatusComponent } from './resident/complaint-status.component';
import { ResidentNoticesComponent } from './resident/resident-notices.component';
import { AdminComplaintsComponent } from './admin/admin-complaints.component';
import { AdminNoticesComponent } from './admin/admin-notices.component';
import { AdminAddNoticeComponent } from './admin/admin-add-notice.component';
import { AdminUsersComponent } from './admin/admin-users.component';
export const routes: Routes = [
  { path: '', component: LoginComponent },

  { path: 'resident', component: ResidentComponent },
  { path: 'resident/complaint', component: ComplaintComponent },
  { path: 'resident/status', component: ComplaintStatusComponent },
  {
    path: 'admin/complaints',
    component: AdminComplaintsComponent,
  },
  {
    path: 'admin/notices',
    component: AdminNoticesComponent,
  },
  { path: 'admin', component: AdminComponent },
  { path: 'worker', component: WorkerComponent },
  { path: 'visitor', component: VisitorComponent },
  { path: 'notice', component: NoticeComponent },
  { path: 'booking', component: BookingComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'apartment', component: ApartmentComponent },
  {
    path: 'admin/add-notice',
    component: AdminAddNoticeComponent,
  },
  { path: 'admin/users', component: AdminUsersComponent },

  { path: 'resident/notices', component: ResidentNoticesComponent },
];
