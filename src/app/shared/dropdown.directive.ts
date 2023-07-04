import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
} from '@angular/core';

@Directive({
  selector: '[appDropdown]',
})
export class DropdownDirective {
  // @HostBinding('class.open') isOpen: boolean = false;
  // @HostListener('click') toggleOpen() {
  //   this.isOpen = !this.isOpen;
  // }
  // constructor(private elRef: ElementRef) {}
  // @HostListener('click') toggleOpen(eventData: Event) {
  //   this.isOpen = !this.isOpen;
  //   if (this.isOpen) {
  //     this.elRef.nativeElement.classList.add('open');
  //   } else {
  //     this.elRef.nativeElement.classList.remove('open');
  //   }
  // }

  //To close the dropdown from anywhere

  @HostBinding('class.open') isOpen = false;
  @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
    this.isOpen = this.elRef.nativeElement.contains(event.target)
      ? !this.isOpen
      : false;
  }
  constructor(private elRef: ElementRef) {}
}
