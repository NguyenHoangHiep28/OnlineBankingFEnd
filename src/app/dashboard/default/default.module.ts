import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultComponent } from './default.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    DefaultComponent,
  ],
  imports: [
    SharedModule,
  ],
  providers :[]
})
export class DefaultModule { }
