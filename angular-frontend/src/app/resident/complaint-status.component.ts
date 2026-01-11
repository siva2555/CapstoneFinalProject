import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // ✅ REQUIRED
import { FormsModule } from '@angular/forms'; // if using ngModel
import { GraphqlService } from '../services/graphql.service';

@Component({
  selector: 'app-complaint-status',
  standalone: true,
  imports: [
    CommonModule, // ✅ FIXES ngIf, ngFor, ngClass
    FormsModule, // ✅ FIXES ngModel
  ],
  templateUrl: './complaint-status.component.html',
})
export class ComplaintStatusComponent {
  flat = '';
  complaints: any[] = [];

  constructor(private gql: GraphqlService) {}

  checkStatus() {
    this.gql.getResidentComplaints(this.flat).subscribe({
      next: (res: any) => {
        this.complaints = res.data.residentComplaints;
      },
    });
  }
}
