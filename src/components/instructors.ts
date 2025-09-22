import { Component, inject } from '@angular/core';
import { DataService } from '../services/data-service';

@Component({
  selector: 'instructors',
  imports: [],
  templateUrl: './instructors.html' 
})
export class Instructors {
  dataService = inject(DataService);

  instructors = this.dataService.instructors;

  getRandomColor(id: number): string {
    const colors = ['primary', 'success', 'danger', 'warning', 'info', 'secondary', 'dark'];
    return colors[id % colors.length];
  }
}
