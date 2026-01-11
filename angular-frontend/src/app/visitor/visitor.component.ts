import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { GraphqlService } from '../services/graphql.service';

@Component({
  selector: 'app-visitor',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './visitor.component.html',
})
export class VisitorComponent {
  name = '';
  flat = '';
  purpose = '';

  constructor(private gql: GraphqlService) {}

  add() {
    this.gql.addVisitor(this.name, this.flat, this.purpose).subscribe(() => alert('Visitor Added'));
  }
}
