import { Component, inject } from '@angular/core';
import { DataService } from '../services/data-service';

@Component({
  selector: 'courses',
  imports: [],
  templateUrl: './courses.html'
})
export class Courses {
   dataService = inject(DataService);

   courses = this.dataService.courses;

  getLevelColor(level?: string): string {
    console.log("level" + level + " " +level?.toLocaleLowerCase('tr-TR'));
    switch((level || 'başlangıç').toLocaleLowerCase('tr-TR').trim()) {
      case 'başlangıç': return 'success';
      case 'orta': return 'warning';
      case 'ileri': return 'primary';
      default: return 'secondary';
    }
  }
}
