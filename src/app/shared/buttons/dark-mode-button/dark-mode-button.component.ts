import {Component, Input} from '@angular/core';
import {DarkModeService} from "../../../core/services/dark-mode/dark-mode.service";

@Component({
  selector: 'app-dark-mode-button',
  templateUrl: './dark-mode-button.component.html',
  styleUrls: ['./dark-mode-button.component.scss']
})
export class DarkModeButtonComponent {
  @Input() preventAction: boolean = false;

  constructor(private darkModeService: DarkModeService) {
  }

  get isEnabled(): boolean {
    return this.darkModeService.darkMode();
  }

  public toggleDarkMode(): void {
    this.darkModeService.toggleDarkMode();
  }
}
