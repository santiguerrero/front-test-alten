import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-toggle-theme',
  templateUrl: './toggle-theme.component.html',
  styleUrls: ['./toggle-theme.component.scss']
})
export class ToggleThemeComponent {
  toggleValue: boolean = false;
  constructor(
    @Inject(DOCUMENT) private document: Document
  ) {}


  changeTheme(value: boolean) {
    value ?  this.document.body.classList.add('dark-mode') :  this.document.body.classList.remove('dark-mode');
  }

}
