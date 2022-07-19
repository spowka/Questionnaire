import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, Subject, takeUntil } from 'rxjs';
import { EQuestionTypes, IQuestion } from 'src/app/models/question.model';
import { QuestionService } from 'src/app/services/question.service';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-questions-management',
  templateUrl: './questions-management.component.html',
  styleUrls: ['./questions-management.component.scss']
})
export class QuestionsManagementComponent implements OnInit {
  public questions$: Observable<IQuestion[]>;
  public displayedColumns: string[] = ['id', 'text', 'type', 'createdAt', 'updatedAt', 'actions'];
  public dataSource = new MatTableDataSource<IQuestion>();

  public EQuestionTypes = EQuestionTypes;

  private unsubscribe$: Subject<void> = new Subject();

  constructor(private _liveAnnouncer: LiveAnnouncer, private questionService: QuestionService, private dialog: MatDialog) {
    this.questions$ = this.questionService.questions$;

    this.questions$.pipe(takeUntil(this.unsubscribe$)).subscribe(questions => this.dataSource.data = questions)
  }

  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.questionService.fetchQuestions();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
  public onDeleteQuestion(id: string) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: { text: 'Are you sure you want to delete this question?' }
    });

    dialogRef.afterClosed().subscribe(confirmed => {
      if (!confirmed) return;

      this.questionService.deleteQuestion(id);
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
