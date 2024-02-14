import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

/**
 * #Modules for import and export
 */

const CurrentModulesMaterial = [
  MatSlideToggleModule,
  MatProgressBarModule,
  MatButtonModule
];

@NgModule({
  imports: [
    CommonModule,
    ...CurrentModulesMaterial
  ],
  exports: [
    ...CurrentModulesMaterial
  ]
})
export class MaterialModule { }
