import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Course } from '../../models/models';

@Component({
  selector: 'app-course-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="card overflow-hidden group h-full flex flex-col">
      <div class="relative overflow-hidden">
        <img [src]="course.thumbnail || 'https://via.placeholder.com/400x200'" 
             [alt]="course.title" 
             class="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300">
        <span class="absolute top-4 right-4 bg-indigo-600 text-white text-xs px-3 py-1.5 rounded-lg font-semibold shadow-lg">
          {{ course.price === 0 ? 'Free' : '₹' + course.price }}
        </span>
      </div>

      <div class="p-6 flex-1 flex flex-col">
        <div class="flex items-center gap-2 mb-3">
          <span class="text-xs text-indigo-600 dark:text-indigo-400 font-semibold bg-indigo-100 dark:bg-indigo-900/30 px-3 py-1 rounded-full">
            {{ course.category }}
          </span>
          <span class="text-xs text-slate-500 dark:text-slate-400 capitalize">{{ course.level }}</span>
        </div>

        <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-2 line-clamp-2">
          {{ course.title }}
        </h3>

        <p class="text-slate-600 dark:text-slate-400 text-sm mb-4 line-clamp-2 flex-1">
          {{ course.description }}
        </p>

        <div class="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400 mb-4 pt-4 border-t border-slate-200 dark:border-slate-700">
          <span class="flex items-center gap-1">⭐ 4.8</span>
          <span>{{ course.duration }}</span>
        </div>

        <a [routerLink]="['/courses', course._id]" 
           class="btn-primary w-full text-center py-2.5 block">
          View Course
        </a>
      </div>
    </div>
  `,
  styles: [`
    .line-clamp-2 {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  `]
})
export class CourseCardComponent {
  @Input() course!: Course;
}
