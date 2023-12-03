import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-regular-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './regular-button.component.html',
  styleUrl: './regular-button.component.scss',
})
export class RegularButtonComponent {
  @Input() public withButton: boolean = false;
  @Input() public activeRoute: boolean = true;
  @Input() public text: string = '';

  get buttonClasses(): string {
    return this.activeRoute ? 'active' : 'inactive';
  }
}
