import { KeyValue } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { EQuestionTypes } from 'src/app/models/question.model';
import { QuestionService } from 'src/app/services/question.service';
import * as uuid from 'uuid';

@Component({
  selector: 'app-questions-create',
  templateUrl: './questions-create.component.html',
  styleUrls: ['./questions-create.component.scss']
})
export class QuestionsCreateComponent implements OnInit {
  public id!: string;

  public form: FormGroup;

  public EQuestionTypes = EQuestionTypes;

  get text(): FormControl {
    return this.form.get('text') as FormControl
  }

  get answers(): FormArray {
    return this.form.get('answers') as FormArray
  }

  private unsubscribe$: Subject<void> = new Subject();

  constructor(
    private fb: FormBuilder,
    private questionService: QuestionService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.form = this.initForm();

    this.form.get('type')?.valueChanges.pipe(takeUntil(this.unsubscribe$)).subscribe((type: keyof EQuestionTypes) => {
      this.answers.clear();
      this.onAddAnswer();
    })
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') as string;

    if (this.id) {
      const question = this.questionService.getQuestionById(this.id);
      if (!question) {
        return
      }

      this.form.patchValue(question);
      this.answers.clear();
      question.answers.map(answer => this.answers.push(this.getAnswerControl(answer)))
    } else {
      this.form.get('id')?.setValue(uuid.v4());
    }
  }

  originalOrder = (a: KeyValue<string, string>, b: KeyValue<string, string>): number => {
    return 0;
  }

  onSubmit(): void {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }

    if (this.id) {
      this.form.get('updatedAt')?.setValue(new Date().toUTCString())
      this.questionService.updateQuestion(this.form.getRawValue());
    } else {
      this.form.get('createdAt')?.setValue(new Date().toUTCString())
      this.questionService.setQuestion(this.form.getRawValue())
    }

    this.router.navigate(['/questions']);
  }

  onAddAnswer() {
    this.answers.push(this.getAnswerControl());
  }

  onRemoveAnswer(index: number) {
    this.answers.removeAt(index);
  }

  private initForm(): FormGroup {
    return this.fb.group({
      id: [{ value: null, disabled: true }, Validators.required],
      text: ['', Validators.compose([Validators.required, Validators.maxLength(255)])],
      type: [null, Validators.required],
      createdAt: [null],
      updatedAt: [null],
      answers: this.fb.array([], Validators.minLength(1)),
      answered: [false],
      answeredDate: [null],
    })
  }

  private getAnswerControl(value = ''): FormControl {
    return this.fb.control(value);
  }

}
