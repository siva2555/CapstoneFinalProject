import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { GraphqlService } from '../services/graphql.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-admin-notices',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-notices.component.html',
})
export class AdminNoticesComponent implements OnInit {
  notices: any[] = [];
  loading = true;

  constructor(private gql: GraphqlService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadNotices();
  }

  loadNotices(): void {
    this.loading = true;

    this.gql
      .getNotices()
      .pipe(
        finalize(() => {
          this.loading = false; // 🔥 ALWAYS stops loading
          this.cdr.detectChanges(); // 🔥 FORCE UI update
        })
      )
      .subscribe({
        next: (res: any) => {
          console.log('ADMIN NOTICES RESPONSE 👉', res);

          // ✅ THIS IS THE IMPORTANT LINE
          this.notices = res?.data?.notices ?? [];
        },
        error: (err) => {
          console.error('ADMIN NOTICES ERROR ❌', err);
          this.notices = [];
        },
      });
  }

  deleteNotice(id: number) {
    if (!confirm('Delete this notice?')) return;

    this.gql.deleteNotice(id).subscribe(() => {
      this.notices = this.notices.filter((n) => n.id !== id);
      this.cdr.detectChanges();
    });
  }
}
