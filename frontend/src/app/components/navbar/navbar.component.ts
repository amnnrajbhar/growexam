import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <nav class="bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg border-b border-slate-200 dark:border-slate-800 sticky top-0 z-50 shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center">
            <a routerLink="/" class="flex items-center space-x-2 group">
              <div class="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <span class="text-white font-bold text-xl">G</span>
              </div>
              <span class="text-xl font-bold gradient-text">GrowExam</span>
            </a>
          </div>

          <div class="hidden md:flex items-center space-x-1">
            <a routerLink="/" routerLinkActive="text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30" [routerLinkActiveOptions]="{exact: true}" class="px-4 py-2 rounded-lg text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">Home</a>
            <a routerLink="/courses" routerLinkActive="text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30" class="px-4 py-2 rounded-lg text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">Courses</a>
            @if (authService.currentUser()) {
              <a routerLink="/dashboard" routerLinkActive="text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30" class="px-4 py-2 rounded-lg text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">Dashboard</a>
            }
            @if (authService.isAdmin()) {
              <a routerLink="/admin" routerLinkActive="text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30" class="px-4 py-2 rounded-lg text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">Admin</a>
            }
          </div>

          <div class="flex items-center space-x-3">
            <button 
              (click)="toggleDarkMode()" 
              class="p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all hover:scale-110 active:scale-95">
              <svg *ngIf="!isDarkMode" class="w-5 h-5 text-slate-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
              </svg>
              <svg *ngIf="isDarkMode" class="w-5 h-5 text-slate-300" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.536l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.707.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zm5.657-9.193a1 1 0 00-1.414 0l-.707.707A1 1 0 005.05 13.536l.707.707a1 1 0 001.414-1.414l-.707-.707zM3 11a1 1 0 100-2H2a1 1 0 100 2h1z" clip-rule="evenodd"></path>
              </svg>
            </button>

            @if (authService.currentUser(); as user) {
              <div class="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800">
                <div class="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-semibold text-sm">
                  {{ user.name.charAt(0).toUpperCase() }}
                </div>
                <span class="text-slate-700 dark:text-slate-300 text-sm font-medium">{{ user.name }}</span>
              </div>
              <button 
                (click)="authService.logout()" 
                class="px-4 py-2 text-sm text-slate-600 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 transition-all rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 font-medium">
                Log Out
              </button>
            } @else {
              <a routerLink="/login" class="px-4 py-2 text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 font-medium">Log In</a>
              <a routerLink="/signup" class="px-5 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all font-medium shadow-lg hover:shadow-xl hover:scale-105 active:scale-95">Sign Up</a>
            }
          </div>
        </div>
      </div>
    </nav>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class NavbarComponent {
  isDarkMode = false;

  constructor(public authService: AuthService) {
    this.isDarkMode = document.documentElement.classList.contains('dark');
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    
    if (this.isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }
}
