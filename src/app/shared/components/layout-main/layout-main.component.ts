import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackInfoComponent } from '../snack-info/snack-info.component';
import { DataSnackBarInfo } from '../../models/shared.interfaces';



@Component({
  selector: 'app-layout-main',
  templateUrl: './layout-main.component.html',
  styleUrls: ['./layout-main.component.scss']
})
export class LayoutMainComponent {
  valueColorTheme: boolean = false;
  constructor(@Inject(DOCUMENT) public document: Document, private snackBar: MatSnackBar ) {}

  changeColorTheme() {

    this.valueColorTheme ? this.document.body.classList.add('dark-mode') : this.document.body.classList.remove('dark-mode');

    this.snackBar.openFromComponent<SnackInfoComponent, DataSnackBarInfo >(SnackInfoComponent, {
      data: this.valueColorTheme ? {text: 'Dark mode abilitato' }  :  {text: 'Dark mode disabilitato' }  ,
      horizontalPosition: 'end',
      duration: 2000
      

    })


  }

}
