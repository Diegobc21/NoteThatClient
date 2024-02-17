import {CommonModule} from '@angular/common';
import {Component} from '@angular/core';
import {BaseButtonComponent} from "../base-button/base-button.component";

@Component({
  selector: 'app-navigation-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navigation-button.component.html',
  styleUrl: './navigation-button.component.scss',
})
export class NavigationButtonComponent extends BaseButtonComponent {
  
  get buttonClasses(): string {
    return this.activeRoute ? 'active' : 'inactive';
  }
}
