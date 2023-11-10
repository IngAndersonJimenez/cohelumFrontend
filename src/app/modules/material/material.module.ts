import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatGridListModule } from '@angular/material/grid-list'
import { MatNativeDateModule } from '@angular/material/core';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatExpansionModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatGridListModule,
    CdkAccordionModule,
    MatTableModule,
    MatExpansionModule,
    MatCardModule,
    MatTableModule,
    MatInputModule,
    MatButtonModule,
    MatPaginatorModule,
    MatCardModule,
    MatNativeDateModule,
    MatDatepickerModule
  ],
  exports: [
    MatExpansionModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatGridListModule,
    CdkAccordionModule,
    MatTableModule,
    MatExpansionModule,
    MatCardModule,
    MatTableModule,
    MatInputModule,
    MatButtonModule,
    MatPaginatorModule,
    MatCardModule,
    MatNativeDateModule,
    MatDatepickerModule
  ]
})
export class MaterialModule { }
