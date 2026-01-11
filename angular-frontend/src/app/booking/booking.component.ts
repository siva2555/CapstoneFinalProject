import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { GraphqlService } from '../services/graphql.service';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './booking.component.html',
})
export class BookingComponent {
  facility = '';
  flat = '';
  date = '';

  constructor(private gql: GraphqlService) {}

  book() {
    this.gql
      .addBooking(this.facility, this.flat, this.date)
      .subscribe(() => alert('Booking Requested'));
  }
}
