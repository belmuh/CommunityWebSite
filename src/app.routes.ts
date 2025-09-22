import { Routes } from '@angular/router';

export const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home',loadComponent: () => import('./components/home').then(c => c.Home)},
    /*{path: 'about', loadComponent: () => import('./components/about').then(c => c.About)},
    {path: 'courses', loadComponent: () => import('./components/courses').then(c => c.Courses)},
    {path: 'instructors', loadComponent: () => import('./components/instructors').then(c => c.Instructors)},
    {path: 'calendar', loadComponent: () => import('./components/calendar').then(c => c.Calendar)},*/
    {path: '**', redirectTo: 'home' }
];
