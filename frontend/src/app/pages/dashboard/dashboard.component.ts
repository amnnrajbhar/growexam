import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { EnrollmentService } from '../../services/enrollment.service';
import { QuizService } from '../../services/quiz.service';
import { Enrollment, Result } from '../../models/models';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  enrollments: Enrollment[] = [];
  results: Result[] = [];
  averageScore = 0;

  constructor(
    private enrollmentService: EnrollmentService,
    private quizService: QuizService
  ) {}

  ngOnInit() {
    this.enrollmentService.getMyEnrollments().subscribe(data => {
      this.enrollments = data;
    });

    this.quizService.getResults().subscribe(data => {
      this.results = data;
      if (data.length > 0) {
        const total = data.reduce((sum, r) => sum + r.percentage, 0);
        this.averageScore = Math.round(total / data.length);
      }
    });
  }
}
