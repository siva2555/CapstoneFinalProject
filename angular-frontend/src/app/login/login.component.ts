import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { GraphqlService } from '../services/graphql.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule], // ✅ IMPORTANT
  templateUrl: './login.component.html',
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private gql: GraphqlService, private router: Router) {}

  login() {
    this.gql.login(this.email, this.password).subscribe({
      next: (res: any) => {
        const user = res.data.login;
        localStorage.setItem('user', JSON.stringify(user));

        if (user.role === 'ADMIN') this.router.navigate(['/admin']);
        else if (user.role === 'WORKER') this.router.navigate(['/worker']);
        else this.router.navigate(['/resident']);
      },
      error: () => alert('Invalid email or password'),
    });
  }
}
