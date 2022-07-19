import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialDesignModule } from './material-design.module';
import { TypeSafeMatCellDef } from './directives/type-safe-mat-cell.directive';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { FilterPipe } from './pipes/filter.pipe';

@NgModule({
  declarations: [TypeSafeMatCellDef, ConfirmationDialogComponent, FilterPipe],
  imports: [
    MaterialDesignModule,
    CommonModule,
  ],
  exports: [
    MaterialDesignModule,
    TypeSafeMatCellDef,
    FilterPipe
  ]
})
export class SharedModule { }
