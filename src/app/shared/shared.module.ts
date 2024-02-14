import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { ToggleThemeComponent } from './components/toggle-theme/toggle-theme.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ToggleThemeComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule
  ],
  exports: [
    MaterialModule,
    ToggleThemeComponent
  ]
})
export class SharedModule { }
