// home.component.ts
import { Component, ViewChildren, ViewChild, QueryList, ElementRef, AfterViewInit, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { About } from './about';
import { Calendar } from './calendar';
import { Courses } from './courses';
import { Instructors } from './instructors';
import { Navbar } from './navbar';
import { Contact } from "./contact";

@Component({
  selector: 'home',
  standalone: true,
  imports: [CommonModule, About, Courses, Instructors, Calendar, Navbar, Contact],
  templateUrl: './home.html'
})
export class Home implements AfterViewInit, OnDestroy {
  @ViewChildren('section', { read: ElementRef }) sections!: QueryList<ElementRef>;
  @ViewChild('carousel') carousel!: ElementRef;
  activeSection = signal<string | null>(null);

  posts = [
    { title: 'Haftalık Etkinlikler', image: 'posts/sohbet.jpeg' },
    { title: 'Değerli İş Birlikleri', image: 'posts/meetScreen.jpeg' },
    { title: 'Ücretsiz Eğitimler', image: 'posts/python-course.jpeg' },
    { title: 'Özel Konu Sunumları', image: 'posts/session.jpeg' },
    { title: 'WhatsApp Paylaşım Platformu', image: 'posts/wp.jpeg' }
  ];

  private observer: IntersectionObserver | null = null;

  ngAfterViewInit(): void {
    const carouselElement = this.carousel.nativeElement;
    if (typeof window !== 'undefined' && (window as any).bootstrap?.Carousel) {
      new (window as any).bootstrap.Carousel(carouselElement, {
        interval: 2000
      });
    }
    this.setupIntersectionObserver();
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  private setupIntersectionObserver(): void {
    const options = {
         rootMargin: '-100px 0px -60px 0px',
    threshold: 0.15
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          console.log(`Görünür bölüm: ${entry.target.id}`);
          this.activeSection.set(entry.target.id);
        }
      });
    }, options);

    this.sections.forEach(section => {
      this.observer?.observe(section.nativeElement);
    });
  }
}