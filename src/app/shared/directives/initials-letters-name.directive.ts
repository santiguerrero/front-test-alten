import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { User } from '../models/shared.interfaces';

@Directive({
  selector: '[appInitialsLettersName]'
})
export class InitialsLettersNameDirective implements OnInit {
  @Input() user!:  User | undefined;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    const name = this.user?.name || 'Not Found';
    const initials = this.calculateInitials(name);
    this.renderer.setProperty(this.elementRef.nativeElement, 'innerText', initials);
  }

  calculateInitials(name: string): string {
    if (!name) return '';
    const nameParts = name.split(' ');
    return nameParts.map(part => part.charAt(0)).join('').toUpperCase();
  }

}
