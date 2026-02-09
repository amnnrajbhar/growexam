import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CourseService } from '../../services/course.service';
import { CourseCardComponent } from '../../components/course-card/course-card.component';
import { Course } from '../../models/models';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule, FormsModule, CourseCardComponent],
  templateUrl: './courses.component.html'
})
export class CoursesComponent implements OnInit {
  courses: Course[] = [];
  categories: string[] = [];
  searchTerm = '';
  selectedCategory = '';
  selectedLevel = '';

  constructor(private courseService: CourseService) {}

  ngOnInit() {
    this.loadCourses();
    this.courseService.getCategories().subscribe(cats => {
      this.categories = cats;
    });
  }

  loadCourses() {
    this.courseService.getCourses().subscribe(courses => {
      this.courses = courses;
    });
  }

  filterCourses() {
    const params: any = {};
    if (this.searchTerm) params.search = this.searchTerm;
    if (this.selectedCategory) params.category = this.selectedCategory;
    if (this.selectedLevel) params.level = this.selectedLevel;

    this.courseService.getCourses(params).subscribe(courses => {
      this.courses = courses;
    });
  }

  resetFilters() {
    this.searchTerm = '';
    this.selectedCategory = '';
    this.selectedLevel = '';
    this.loadCourses();
  }
}
