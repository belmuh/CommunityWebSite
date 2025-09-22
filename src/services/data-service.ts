import { Injectable, inject, resource, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

interface InstructorCard {
  id: number;
  name: string;
  bio: string;
  expertise: string[];
  email: string;
  avatar: string;
}

interface CourseCard {
  id: number;
  name: string;
  description?: string; // Opsiyonel ekle
  level?: string;
}

interface TimeSlotCard {
  id: number; // ID eksikti
  day: string;
  startTime: string; // Bunları da ekleyebilirsin
  endTime: string;
}

export interface ScheduleCard {
  id: number; // ID eksikti
  courseId?: number; // İlişkiler için
  timeSlotId?: number;
  startDate: string;
  endDate: string;
  recurrence?: string; // Örneğin "weekly", "biweekly" vb.
  instructorId?: number;
  status: string;
 
}

interface AppData { // Büyük harfle (TypeScript convention)
  instructors: InstructorCard[];
  courses: CourseCard[];
  timeSlots: TimeSlotCard[];
  schedule: ScheduleCard[];
}


@Injectable({
  providedIn: 'root'
})
export class DataService {
  private http = inject(HttpClient);

  private appDataResource = resource({
    loader: () => lastValueFrom(this.http.get<AppData>('/data.json'))
  });

  instructors = computed(() => this.appDataResource.value()?.instructors || []);
  courses = computed(() => this.appDataResource.value()?.courses || []);
  timeSlots = computed(() => this.appDataResource.value()?.timeSlots || []);
  schedule = computed(() => this.appDataResource.value()?.schedule || []);

  isloading = computed(() => this.appDataResource.isLoading());
  hasError = computed(() => !!this.appDataResource.error());

 
}
