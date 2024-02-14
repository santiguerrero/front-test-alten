import { AfterViewInit, Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[appFirstLetterCapitalize]'
})
export class FirstLetterCapitalizeDirective implements AfterViewInit {

  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    const text = this.el.nativeElement.innerText.trim();
    if (text) {
      const words = text.split(' ');
      const capitalizedFirstWord = words[0].charAt(0).toUpperCase() + words[0].slice(1);
      this.el.nativeElement.innerText = capitalizedFirstWord + (words.length > 1 ? ' ' + words.slice(1).join(' ') : '');
    }
  }

}
