export interface NavItem {
  id: string;
  label: string;
  icon: string;
}

export const NAV_ITEMS: NavItem[] = [
  { id: 'home', label: 'Ana Sayfa', icon: 'bi-info-circle' },
  { id: 'about', label: 'Hakkında', icon: 'bi-info-circle' },
  { id: 'courses', label: 'Kurslar', icon: 'bi-mortarboard-fill' },
  { id: 'instructors', label: 'Eğitmenler', icon: 'bi-people-fill' },
  { id: 'calendar', label: 'Program', icon: 'bi-calendar-check' },
  { id: 'contact', label: 'İletişim', icon: 'bi-chat-dots' }
];
