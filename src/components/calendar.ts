import { Component, effect, inject, signal, Injectable,  DOCUMENT, OnDestroy, OnInit } from '@angular/core';
import { DateAdapter, 
        provideCalendar, 
        CalendarPreviousViewDirective, 
        CalendarTodayDirective, 
        CalendarNextViewDirective, 
        CalendarMonthViewComponent, 
        CalendarWeekViewComponent, 
        CalendarDayViewComponent,
        CalendarDateFormatter,
        DateFormatterParams,
        CalendarEvent, 
        CalendarEventTimesChangedEvent,
        CalendarView, 
        CalendarDatePipe } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { DataService } from '../services/data-service';
import { setHours, setMinutes } from 'date-fns';
import { formatDate } from '@angular/common';
import { Subject } from 'rxjs';
import { ScheduleCard } from '../services/data-service';

@Injectable()
class CustomDateFormatter extends CalendarDateFormatter {
  override weekViewHour({ date, locale }: DateFormatterParams): string {
    return formatDate(date, 'HH:mm', locale || 'tr');  // 24 saat
  }

  override dayViewHour({ date, locale }: DateFormatterParams): string {
    return formatDate(date, 'HH:mm', locale || 'tr');  // 24 saat
  }
}
@Component({
  selector: 'calendar',
   imports: [CalendarPreviousViewDirective, 
    CalendarTodayDirective, 
    CalendarNextViewDirective, 
    CalendarMonthViewComponent, 
    CalendarWeekViewComponent, 
    CalendarDayViewComponent, 
    CalendarDatePipe],
  providers: [
    provideCalendar({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    { provide: CalendarDateFormatter, useClass: CustomDateFormatter } 
  ],
 
  templateUrl: './calendar.html',
   styleUrls: ['./calendar.scss']
})
export class Calendar implements OnInit, OnDestroy{
  dataService = inject(DataService);

  instructors = this.dataService.instructors;
  courses = this.dataService.courses;
  timeSlots = this.dataService.timeSlots;
  schedule = this.dataService.schedule;

  readonly CalendarView = CalendarView;
  viewDate = new Date();
  events = signal<CalendarEvent[]>([]);
  view: CalendarView = CalendarView.Week;

  private previousSchedule: ScheduleCard[] = [];

  constructor() {
    effect(() => {
      const schedule = this.schedule();
      const courses = this.courses();
      const instructors = this.instructors();
      const timeSlots = this.timeSlots();

      const newEvents: CalendarEvent[] = [];

      for(const entry of schedule){
        const prev = this.previousSchedule.find(s => s.id === entry.id);
        if (prev && JSON.stringify(prev) === JSON.stringify(entry)) {
          // Değişmemiş, var olan event’i yeniden ekleyelim
          const existingEvent = this.events().find(e => e.title.includes(entry.id.toString()));
          if (existingEvent) newEvents.push(existingEvent);
          continue;
        }
        const course = courses.find(c => c.id === entry.courseId);
        const instructor = instructors.find(i => i.id === entry.instructorId);
        const timeSlot = timeSlots.find(t => t.id === entry.timeSlotId);
        
        if(course && instructor && timeSlot){
          const startDate = new Date(entry.startDate);
          const [startHour, startMinute] = timeSlot.startTime.split(':').map(Number);
          const [endHour, endMinute] = timeSlot.endTime.split(':').map(Number);

          newEvents.push({
            start: setMinutes(setHours(startDate, startHour), startMinute),
            end: setMinutes(setHours(startDate, endHour), endMinute),
            title: `${course.name} - ${instructor.name}`,
            color: {
              primary: '#409cffff',
              secondary: '#badefdff',
            },
            allDay: false,
          });
        }
  }
      this.events.set(newEvents);
     
       });
    }
  

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {}


  refresh = new Subject<void>();

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    event.start = newStart;
    event.end = newEnd;
    this.refresh.next();
  }

  private document = inject<Document>(DOCUMENT);

  private readonly darkThemeClass = 'dark-theme';

  ngOnInit(): void {
      if (this.document?.body) {
    this.document.body.classList.add(this.darkThemeClass);
    // Required if using bootstrap
    this.document.body.parentElement?.setAttribute('data-bs-theme', 'dark');
      }
  }

  ngOnDestroy(): void {
      if (this.document?.body) {
    this.document.body.classList.remove(this.darkThemeClass);
    // Required if using bootstrap
    this.document.body.parentElement?.removeAttribute('data-bs-theme');
      }
  }
}
