import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { LessonService } from '../../services/lesson.service';
import { EnrollmentService } from '../../services/enrollment.service';
import { QuizService } from '../../services/quiz.service';
import { Lesson, Quiz } from '../../models/models';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-lesson-viewer',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './lesson-viewer.component.html'
})
export class LessonViewerComponent implements OnInit {
  lesson: Lesson | null = null;
  allLessons: Lesson[] = [];
  quizzes: Quiz[] = [];
  completing = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private lessonService: LessonService,
    private enrollmentService: EnrollmentService,
    private quizService: QuizService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.lessonService.getLesson(id).subscribe(lesson => {
      this.lesson = lesson;
      this.loadCourseLessons(lesson.courseId);
      this.loadQuizzes(lesson.courseId);
    });
  }

  loadCourseLessons(courseId: string) {
    this.lessonService.getLessons(courseId).subscribe(lessons => {
      this.allLessons = lessons;
    });
  }

  loadQuizzes(courseId: string) {
    this.quizService.getQuizzes(courseId).subscribe(quizzes => {
      this.quizzes = quizzes;
    });
  }

  getVideoUrl(): SafeResourceUrl {
    if (!this.lesson?.videoUrl) return '';
    let url = this.lesson.videoUrl;
    
    if (url.includes('youtube.com/watch')) {
      const videoId = url.split('v=')[1]?.split('&')[0];
      url = `https://www.youtube.com/embed/${videoId}`;
    }
    
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  markComplete() {
    if (!this.lesson) return;
    
    this.completing = true;
    this.enrollmentService.updateProgress(this.lesson.courseId, this.lesson._id).subscribe({
      next: () => {
        alert('Lesson marked as complete!');
        this.completing = false;
      },
      error: () => {
        this.completing = false;
      }
    });
  }
}
