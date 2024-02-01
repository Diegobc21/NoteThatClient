import { Component } from '@angular/core';
import { DarkModeService } from 'src/app/core/services/dark-mode/dark-mode.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
})
export class SettingsComponent {
  constructor(private darkModeService: DarkModeService) {}

  get isDarkModeEnabled(): boolean {
    return this.darkModeService.darkMode();
  }
}
