import { AfterViewInit, Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[appFirstLetterCapitalize]'
})
export class FirstLetterCapitalizeDirective implements AfterViewInit {

  constructor(private elementRef: ElementRef<HTMLElement>) { }
  ngAfterViewInit(): void {

    const text = this.elementRef.nativeElement.textContent;
    
    if (text) {
      const capitalizedText = this.capitalizeFirstWord(text);
      this.elementRef.nativeElement.textContent = capitalizedText;
    }

  }

  capitalizeFirstWord(text: string): string {
    return text.replace(/\b\w/g, (char) => char.toUpperCase());
  }

}
