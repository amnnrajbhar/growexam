import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../services/admin.service';
import { CourseService } from '../../services/course.service';
import { Course } from '../../models/models';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin.component.html'
})
export class AdminComponent implements OnInit {
  dashboard: any = null;
  courses: Course[] = [];
  showCourseForm = false;
  courseForm: any = {
    title: '',
    description: '',
    category: '',
    instructor: '',
    duration: '',
    level: 'beginner',
    thumbnail: ''
  };
  editingCourseId: string | null = null;

  constructor(
    private adminService: AdminService,
    private courseService: CourseService
  ) {}

  ngOnInit() {
    this.loadDashboard();
    this.loadCourses();
  }

  loadDashboard() {
    this.adminService.getDashboard().subscribe(data => {
      this.dashboard = data;
    });
  }

  loadCourses() {
    this.courseService.getCourses().subscribe(courses => {
      this.courses = courses;
    });
  }

  saveCourse() {
    if (this.editingCourseId) {
      this.courseService.updateCourse(this.editingCourseId, this.courseForm).subscribe(() => {
        this.resetForm();
        this.loadCourses();
      });
    } else {
      this.courseService.createCourse(this.courseForm).subscribe(() => {
        this.resetForm();
        this.loadCourses();
      });
    }
  }

  editCourse(course: Course) {
    this.courseForm = { ...course };
    this.editingCourseId = course._id;
    this.showCourseForm = true;
  }

  deleteCourse(id: string) {
    if (confirm('Are you sure you want to delete this course?')) {
      this.courseService.deleteCourse(id).subscribe(() => {
        this.loadCourses();
      });
    }
  }

  resetForm() {
    this.courseForm = {
      title: '',
      description: '',
      category: '',
      instructor: '',
      duration: '',
      level: 'beginner',
      thumbnail: ''
    };
    this.editingCourseId = null;
    this.showCourseForm = false;
  }
}
