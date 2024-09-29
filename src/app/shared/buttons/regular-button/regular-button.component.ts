import {CommonModule} from '@angular/common';
import {Component} from '@angular/core';
import {BaseButtonComponent} from "../base-button/base-button.component";
import {LucideIconComponent} from "../../lucide-icon/lucide-icon.component";

@Component({
  selector: 'app-regular-button',
  standalone: true,
  imports: [CommonModule, LucideIconComponent],
  templateUrl: './regular-button.component.html',
  styleUrl: './regular-button.component.scss',
})
export class RegularButtonComponent extends BaseButtonComponent {

}
