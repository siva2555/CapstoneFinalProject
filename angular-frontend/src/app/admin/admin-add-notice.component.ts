import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { GraphqlService } from '../services/graphql.service';

@Component({
  selector: 'app-admin-add-notice',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './admin-add-notice.component.html',
})
export class AdminAddNoticeComponent {
  title = '';
  message = '';
  loading = false;

  constructor(private gql: GraphqlService, private router: Router) {}

  addNotice(): void {
    if (!this.title || !this.message) {
      alert('Please enter title and message');
      return;
    }

    this.loading = true;

    this.gql.addNotice(this.title, this.message).subscribe({
      next: () => {
        alert('Notice added successfully');
        this.router.navigate(['/admin/notices']); // 🔥 go to notices page
      },
      error: () => {
        alert('Failed to add notice');
        this.loading = false;
      },
    });
  }
}
