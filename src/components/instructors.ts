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

  
  getAvatarColorClass(instructor: any): string {
  // Örneğin uzmanlık alanına göre renk seç
  if (instructor.expertise?.includes('React')) return 'avatar-blue';
  if (instructor.expertise?.includes('Backend')) return 'avatar-green';
  if (instructor.expertise?.includes('Data')) return 'avatar-yellow';
  return 'avatar-purple';
}
}
