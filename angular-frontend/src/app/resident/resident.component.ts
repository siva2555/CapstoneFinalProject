import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { GraphqlService } from '../services/graphql.service';

@Component({
  selector: 'app-resident',
  standalone: true,
  imports: [
    CommonModule, // ✅ for *ngFor, *ngIf
    FormsModule,
    RouterModule,
  ],
  templateUrl: './resident.component.html',
})
export class ResidentComponent implements OnInit {
  notices: any[] = [];

  // ✅ SINGLE CONSTRUCTOR
  constructor(private router: Router, private gql: GraphqlService) {}

  ngOnInit() {
      this.gql.getNotices().subscribe((res: any) => {
      this.notices = res.data.notices;
    });
  }

  goToNotices() {
    this.router.navigate(['/resident/notices']);
  }

  goToComplaint() {
    this.router.navigate(['/resident/complaint']);
  }

  goToGateEntry() {
    this.router.navigate(['/resident/gate-entry']);
  }

  goToPayment() {
    this.router.navigate(['/resident/payment']);
  }

  goToStatus() {
    this.router.navigate(['/resident/status']);
  }
  logout() {
    localStorage.clear(); // remove user data
    this.router.navigate(['/']); // go to login
  }
}
