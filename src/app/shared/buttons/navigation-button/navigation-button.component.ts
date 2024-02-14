import {CommonModule} from '@angular/common';
import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-navigation-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navigation-button.component.html',
  styleUrl: './navigation-button.component.scss',
})
export class NavigationButtonComponent {
  @Input() public withButton: boolean = false;
  @Input() public activeRoute: boolean = true;
  @Input() public text: string = '';

  get buttonClasses(): string {
    return this.activeRoute ? 'active' : 'inactive';
  }
}
