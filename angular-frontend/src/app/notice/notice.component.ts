import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { GraphqlService } from '../services/graphql.service';

@Component({
  selector: 'app-notice',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule], // ✅ MUST
  templateUrl: './notice.component.html',
})
export class NoticeComponent {
  title: string = '';
  message: string = '';

  constructor(private gql: GraphqlService, private router: Router) {}

  addNotice() {
    // 🔴 HARD DEBUG (YOU MUST SEE THIS)
    alert('ADD NOTICE CLICKED');

    if (!this.title || !this.message) {
      alert('Title and message are required');
      return;
    }

    this.gql.addNotice(this.title, this.message).subscribe({
      next: () => {
        alert('Notice added successfully');
        this.router.navigate(['/admin']);
      },
      error: (err) => {
        console.error(err);
        alert('GraphQL error');
      },
    });
  }
}
