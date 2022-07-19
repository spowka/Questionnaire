import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { Observable, Subject, takeUntil } from 'rxjs';
import { EQuestionTypes, IQuestion } from 'src/app/models/question.model';
import { QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'app-questions-list',
  templateUrl: './questions-list.component.html',
  styleUrls: ['./questions-list.component.scss']
})
export class QuestionsListComponent implements OnInit {
  public questions: IQuestion[] = [];
  public displayedColumns: string[] = ['id', 'text', 'createdAt', 'updatedAt'];

  public EQuestionTypes = EQuestionTypes;

  public answers: { [key: string]: string[] } = {};

  private unsubscribe$: Subject<void> = new Subject();

  constructor(private _liveAnnouncer: LiveAnnouncer, private questionService: QuestionService) {
    this.questionService.questions$.pipe(takeUntil(this.unsubscribe$)).subscribe(questions => this.questions = questions);
  }

  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.questionService.fetchQuestions();
  }

  public onChangeAnswer(question: IQuestion, answer: string, checked?: boolean) {
    if (EQuestionTypes[question.type] === EQuestionTypes.multiple_choice) {
      if (!this.answers[question.id]) {
        this.answers[question.id] = [];
      }

      if (!checked) {
        this.answers[question.id] = this.answers[question.id].filter(_answer => _answer !== answer)
      } else {
        this.answers[question.id] = [...this.answers[question.id], answer]
      }
    } else {
      this.answers[question.id] = [answer];
    }
  }

  public onAnswerQuestion(question: IQuestion) {
    if (!this.answers[question.id]?.length) return;

    question.answered = this.answers[question.id]
    question.answeredDate = new Date().toUTCString()
    this.questionService.updateQuestion(question)
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
