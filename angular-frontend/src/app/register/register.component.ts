import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { GraphqlService } from '../services/graphql.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  // REQUIRED FIELDS
  name: string = '';
  email: string = '';
  password: string = '';

  // ROLE (default Resident)
  role: string = 'RESIDENT';

  // ONLY FOR RESIDENT
  flatNo: string = '';

  constructor(private gql: GraphqlService, private router: Router) {}

  register() {
    // Basic validation
    if (!this.name || !this.email || !this.password || !this.role) {
      alert('All fields are required');
      return;
    }

    // Resident-specific validation
    if (this.role === 'RESIDENT' && !this.flatNo) {
      alert('Flat Number is required for Residents');
      return;
    }

    // Call GraphQL register mutation
    this.gql
      .register(
        this.name,
        this.email,
        this.password,
        this.role,
        this.role === 'RESIDENT' ? this.flatNo : undefined
      )
      .subscribe({
        next: () => {
          alert('Registration successful');
          this.router.navigate(['/']); // go to login
        },
        error: (err) => {
          console.error(err);
          alert('Registration failed (email may already exist)');
        },
      });
  }
}
