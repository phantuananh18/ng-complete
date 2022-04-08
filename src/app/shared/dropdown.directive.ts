import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
    selector: '[appDropdown]'
})

export class DropdownDirective {
    isOpen = false;
    constructor(private el: ElementRef, private render: Renderer2) { }

    @HostListener('click') toggleOpen() {
        this.isOpen = true;
        let part = this.el.nativeElement.querySelector('.dropdown-menu');
        if (this.isOpen)
            this.render.addClass(part, 'show');
        else
            this.render.removeClass(part, 'show');
    }
}