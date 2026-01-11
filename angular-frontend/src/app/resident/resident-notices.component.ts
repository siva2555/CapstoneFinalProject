import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { GraphqlService } from '../services/graphql.service';

@Component({
  selector: 'app-resident-notices',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './resident-notices.component.html',
})
export class ResidentNoticesComponent implements OnInit {
  notices: any[] = [];
  loading = true;

  constructor(
    private gql: GraphqlService,
    private cdr: ChangeDetectorRef // 🔥 ADD THIS
  ) {}

  ngOnInit(): void {
    this.loadNotices();
  }

  loadNotices(): void {
    this.loading = true;

    this.gql.getNotices().subscribe({
      next: (res: any) => {
        this.notices = res.data.notices.map((n: any) => ({
          ...n,
          created_at: Number(n.created_at),
        }));

        this.loading = false;

        // 🔥 FORCE UI UPDATE
        this.cdr.detectChanges();
      },
      error: () => {
        this.loading = false;
        this.cdr.detectChanges();
      },
    });
  }
}
