import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { GraphqlService } from '../services/graphql.service';

@Component({
  selector: 'app-complaint',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './complaint.component.html',
})
export class ComplaintComponent {
  flat = '';
  category = '';
  issue = '';

  constructor(private gql: GraphqlService, private router: Router) {}

  submitComplaint() {
    this.gql.addComplaint('Resident', this.flat, this.category, this.issue).subscribe(() => {
      alert('Complaint Registered');
      this.router.navigate(['/resident']); // auto back
    });
  }

  // ✅ THIS METHOD WAS MISSING
  goBack() {
    this.router.navigate(['/resident']);
  }
}
