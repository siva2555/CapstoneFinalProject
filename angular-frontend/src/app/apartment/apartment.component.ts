import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-apartment',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './apartment.component.html',
})
export class ApartmentComponent {
  name = '';
  floors = 0;
  flatsPerFloor = 0;
  flats: string[] = [];

  generate() {
    this.flats = [];
    for (let f = 1; f <= this.floors; f++) {
      for (let n = 1; n <= this.flatsPerFloor; n++) {
        this.flats.push(`${f}0${n}`);
      }
    }
  }
}
