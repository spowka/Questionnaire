import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { IQuestion } from '../models/question.model';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private _questions$: BehaviorSubject<IQuestion[]> = new BehaviorSubject<IQuestion[]>([]);
  public questions$ = this._questions$.asObservable();

  constructor(private toastr: ToastrService) { }

  public fetchQuestions() {
    const data = localStorage.getItem('questions');
    this._questions$.next(data ? JSON.parse(data) : []);
  }

  public getQuestionById(id: string) {
    const data = localStorage.getItem('questions');
    return (JSON.parse(data as string) as IQuestion[]).find(q => q.id === id)
  }

  public setQuestion(question: IQuestion) {
    const questions = [...this._questions$.value, question];
    localStorage.setItem('questions', JSON.stringify(questions));
    this._questions$.next(questions);
    this.toastr.success('Question successfully created');
  }

  public updateQuestion(question: IQuestion) {
    const questions = this._questions$.value.map(q => q.id === question.id ? question : q);
    localStorage.setItem('questions', JSON.stringify(questions));
    this._questions$.next(questions);
  }

  public deleteQuestion(id: string) {
    const questions = this._questions$.value.filter(q => q.id !== id);
    localStorage.setItem('questions', JSON.stringify(questions));
    this._questions$.next(questions);

  }

}
