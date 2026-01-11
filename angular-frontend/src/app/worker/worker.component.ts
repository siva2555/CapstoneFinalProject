import { Component, OnInit } from '@angular/core';
import { GraphqlService } from '../services/graphql.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-worker',
  standalone: true, // ✅ REQUIRED
  imports: [CommonModule, FormsModule],
  templateUrl: './worker.component.html',
})
export class WorkerComponent implements OnInit {
  complaints: any[] = [];
  selectedComplaint: any = null;

  worker_name = '';
  worker_phone = '';
  visit_date = '';

  constructor(private gql: GraphqlService, private router: Router) {}

  ngOnInit(): void {
    this.loadComplaints();
  }

  loadComplaints() {
    this.gql.getWorkerComplaints().subscribe({
      next: (res: any) => {
        console.log('Worker complaints:', res);
        this.complaints = res?.data?.complaints || [];
      },
      error: (err) => console.error(err),
    });
  }

  selectComplaint(c: any) {
    this.selectedComplaint = c;
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/']);
  }

  submit() {
    if (!this.selectedComplaint) return;

    this.gql
      .takeComplaint({
        id: this.selectedComplaint.id,
        name: this.worker_name,
        phone: this.worker_phone,
        date: this.visit_date,
      })
      .subscribe(() => {
        alert('✅ Complaint Assigned');

        this.selectedComplaint = null;
        this.worker_name = '';
        this.worker_phone = '';
        this.visit_date = '';

        this.loadComplaints();
      });
  }
}
