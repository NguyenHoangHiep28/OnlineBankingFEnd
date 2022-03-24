import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultComponent } from './default.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { MainModule } from 'src/app/main/main.module';
@NgModule({
  declarations: [
    DefaultComponent,
  ],
  imports: [
    CommonModule, 
    RouterModule,
    SharedModule,
    MainModule
  ],
  providers :[]
})
export class DefaultModule { }
