import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from '../../services/quiz.service';
import { Quiz, Question } from '../../models/models';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quiz.component.html'
})
export class QuizComponent implements OnInit {
  quiz: Quiz | null = null;
  questions: Question[] = [];
  currentQuestion = signal(0);
  answers = signal<{ [key: number]: number }>({});
  timeLeft = signal(0);
  submitted = signal(false);
  result: any = null;
  startTime = Date.now();
  timerInterval: any;

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private quizService: QuizService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.quizService.getQuiz(id).subscribe(data => {
      this.quiz = data.quiz;
      this.questions = data.questions;
      this.timeLeft.set(data.quiz.duration * 60);
      this.startTimer();
    });
  }

  startTimer() {
    this.timerInterval = setInterval(() => {
      const time = this.timeLeft();
      if (time > 0) {
        this.timeLeft.set(time - 1);
      } else {
        this.submitQuiz();
      }
    }, 1000);
  }

  formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }

  selectAnswer(optionIndex: number) {
    const current = this.answers();
    current[this.currentQuestion()] = optionIndex;
    this.answers.set({ ...current });
  }

  nextQuestion() {
    if (this.currentQuestion() < this.questions.length - 1) {
      this.currentQuestion.set(this.currentQuestion() + 1);
    }
  }

  previousQuestion() {
    if (this.currentQuestion() > 0) {
      this.currentQuestion.set(this.currentQuestion() - 1);
    }
  }

  submitQuiz() {
    clearInterval(this.timerInterval);
    const timeTaken = Math.floor((Date.now() - this.startTime) / 1000);
    const answers = Object.entries(this.answers()).map(([index, answer]) => ({
      questionId: this.questions[+index]._id,
      selectedAnswer: answer
    }));

    this.quizService.submitQuiz(this.quiz!._id, answers, timeTaken).subscribe(result => {
      this.result = result;
      this.submitted.set(true);
    });
  }

  ngOnDestroy() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }
}
