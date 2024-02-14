import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { FormsModule } from '@angular/forms';

import {LayoutModule as LayoutCdkModule} from '@angular/cdk/layout';
import { LayoutMainComponent } from './components/layout-main/layout-main.component';
import { SnackInfoComponent } from './components/snack-info/snack-info.component';
import { RouterModule } from '@angular/router';
import { InitialsLettersNameDirective } from './directives/initials-letters-name.directive';
import { FirstLetterCapitalizeDirective } from './directives/first-letter-capitalize.directive';
import { DialogInfoComponent } from './components/dialog-info/dialog-info.component';



@NgModule({
  declarations: [
    LayoutMainComponent,
    SnackInfoComponent,
    InitialsLettersNameDirective,
    FirstLetterCapitalizeDirective,
    DialogInfoComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    FormsModule,
    LayoutCdkModule
  ],
  exports: [
    MaterialModule,
    LayoutCdkModule,
    
    InitialsLettersNameDirective,
    FirstLetterCapitalizeDirective
  ]
})
export class SharedModule { }
