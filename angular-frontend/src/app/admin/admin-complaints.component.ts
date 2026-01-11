import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { GraphqlService } from '../services/graphql.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-admin-complaints',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-complaints.component.html',
})
export class AdminComplaintsComponent implements OnInit {
  complaints: any[] = [];
  loading = true;

  constructor(private gql: GraphqlService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadComplaints();
  }

  loadComplaints(): void {
    this.loading = true;

    this.gql
      .getComplaints()
      .pipe(
        finalize(() => {
          this.loading = false; // 🔥 ALWAYS stops loading
          this.cdr.detectChanges(); // 🔥 FORCE UI update
        })
      )
      .subscribe({
        next: (res: any) => {
          console.log('ADMIN COMPLAINTS RESPONSE 👉', res);

          // ✅ IMPORTANT LINE
          this.complaints = res?.data?.complaints ?? [];
        },
        error: (err) => {
          console.error('ADMIN COMPLAINTS ERROR ❌', err);
          this.complaints = [];
        },
      });
  }
}
