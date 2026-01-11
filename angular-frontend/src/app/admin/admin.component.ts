import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin.component.html',
})
export class AdminComponent {
  constructor(private router: Router) {}

  goToAddNotice(): void {
    this.router.navigate(['/admin/add-notice']);
  }
  goToUsers() {
    this.router.navigate(['/admin/users']);
  }

  goToNotices(): void {
    this.router.navigate(['/admin/notices']);
  }

  goToComplaints(): void {
    this.router.navigate(['/admin/complaints']);
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/']);
  }
}
