import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../shared/material.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule
  ]
})
export class CoreModule { }
