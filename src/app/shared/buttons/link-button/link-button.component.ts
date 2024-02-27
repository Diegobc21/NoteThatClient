import {CommonModule} from '@angular/common';
import {Component} from '@angular/core';
import {BaseButtonComponent} from "../base-button/base-button.component";
import {LucideAngularModule} from "lucide-angular";

@Component({
  selector: 'app-link-button',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './link-button.component.html',
  styleUrl: './link-button.component.scss',
})
export class LinkButtonComponent extends BaseButtonComponent {
}
