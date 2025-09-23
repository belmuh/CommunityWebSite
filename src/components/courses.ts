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

  getLevelBgClass(level?: string): string {
    switch((level || 'başlangıç').toLocaleLowerCase('tr-TR').trim()) {
      case 'başlangıç': return 'bg-beginner';
      case 'orta': return 'bg-intermediate';
      case 'ileri': return 'bg-advanced';
      default: return '';
    }
  }

  getLevelBadgeClass(level?: string): string {
    switch((level || 'başlangıç').toLocaleLowerCase('tr-TR').trim()) {
      case 'başlangıç': return 'badge-beginner';
      case 'orta': return 'badge-intermediate';
      case 'ileri': return 'badge-advanced';
      default: return '';
    }
  }
}
