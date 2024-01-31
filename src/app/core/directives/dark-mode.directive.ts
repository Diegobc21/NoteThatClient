import {Directive, ElementRef, Renderer2} from '@angular/core';
import {DarkModeService} from "../services/dark-mode/dark-mode.service";

@Directive({
  selector: '[appDarkMode]',
})
export class DarkModeDirective {

  private isDarkMode: boolean = true;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private darkModeService: DarkModeService
  ) {
    this.toggleClasses(); // Llamada inicial al cargar la página

    // Suscripción a cambios en el modo claro/oscuro
    this.darkModeService.isDarkMode.subscribe((isDarkMode: boolean) => {
      this.toggleClasses();
      this.isDarkMode = isDarkMode;
    });
  }

  private toggleClasses() {
    const classMappings: {} = {
      'bg-gray-950': this.isDarkMode ? 'bg-gray-100' : 'bg-gray-950',
      'text-white': this.isDarkMode ? 'text-black' : 'text-white'
    };

    for (const [originalClass, updatedClass] of Object.entries(classMappings)) {
      if (this.el.nativeElement.classList.contains(originalClass)) {
        this.renderer.removeClass(this.el.nativeElement, originalClass);
        this.renderer.addClass(this.el.nativeElement, updatedClass as string);
      }
    }
  }
}
