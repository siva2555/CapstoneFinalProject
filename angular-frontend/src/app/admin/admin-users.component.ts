import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { GraphqlService } from '../services/graphql.service';

@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-users.component.html',
})
export class AdminUsersComponent implements OnInit {
  users: any[] = [];
  loading = true;

  constructor(private gql: GraphqlService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.loading = true;

    this.gql
      .getUsers()
      .pipe(
        finalize(() => {
          this.loading = false; // 🔥 always stop loading
          this.cdr.detectChanges(); // 🔥 force UI update
        })
      )
      .subscribe({
        next: (res: any) => {
          console.log('USERS RESPONSE 👉', res);
          this.users = res?.data?.users ?? [];
        },
        error: (err) => {
          console.error('USERS ERROR ❌', err);
          this.users = [];
        },
      });
  }
}
