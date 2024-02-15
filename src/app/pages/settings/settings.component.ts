import {Component, ViewChild} from '@angular/core';
import { DarkModeService } from 'src/app/core/services/dark-mode/dark-mode.service';
import {DarkModeButtonComponent} from "../../shared/buttons/dark-mode-button/dark-mode-button.component";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
})
export class SettingsComponent {
  @ViewChild('darkModeButtonComponent') darkModeButtonComponent!: DarkModeButtonComponent;

  constructor(private darkModeService: DarkModeService) {}

  get isDarkModeEnabled(): boolean {
    return this.darkModeService.darkMode();
  }

  trigger(): void {
    this.darkModeButtonComponent.toggleDarkMode();
  }
}
