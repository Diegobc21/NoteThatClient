import {Component} from '@angular/core';
import {DarkModeService} from "../../../core/services/dark-mode/dark-mode.service";

@Component({
  selector: 'app-dark-mode-button',
  templateUrl: './dark-mode-button.component.html',
  styleUrls: ['./dark-mode-button.component.scss']
})
export class DarkModeButtonComponent {
  public isDarkMode: boolean = true;


  constructor(private darkModeService: DarkModeService) {
    this.darkModeService.isDarkMode.subscribe(isDarkMode => {
      this.isDarkMode = isDarkMode;
    })
  }

  public toggleDarkMode(): void {
    this.darkModeService.toggleDarkMode();
  }

}
