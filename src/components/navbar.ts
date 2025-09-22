// navbar.ts
import { Component, input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NAV_ITEMS } from '../model/navitem.model';

@Component({
  selector: 'navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.html'
})
export class Navbar {
  // activeSection artık Home component'ten Input olarak geliyor
  activeSection = input<string | null>('home');
  
  navItems = NAV_ITEMS;

  // 2️⃣ isActive computed
  isActive(id: string): boolean {
    return this.activeSection() === id;
  }

  scrollTo(sectionId: string, event: Event): void {
    event.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }
}