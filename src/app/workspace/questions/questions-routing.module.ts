import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  QuestionsCreateComponent,
  QuestionsListComponent,
  QuestionsManagementComponent
} from './view/';

const routes: Routes = [
  { path: '', component: QuestionsManagementComponent },
  { path: 'list', component: QuestionsListComponent },
  { path: 'new', component: QuestionsCreateComponent },
  { path: ':id', component: QuestionsCreateComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuestionsRoutingModule { }
