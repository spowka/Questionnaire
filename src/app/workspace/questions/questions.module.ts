import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuestionsRoutingModule } from './questions-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

import {
  QuestionsListComponent,
  QuestionsCreateComponent,
  QuestionsManagementComponent
} from './view';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    QuestionsListComponent,
    QuestionsCreateComponent,
    QuestionsManagementComponent
  ],
  imports: [
    CommonModule,
    QuestionsRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class QuestionsModule { }
