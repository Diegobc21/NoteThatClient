import {Component, Input} from '@angular/core';
import {BaseButtonComponent} from "../base-button/base-button.component";
import {LucideAngularModule} from "lucide-angular";

@Component({
  selector: 'app-close-button',
  standalone: true,
  imports: [
    LucideAngularModule
  ],
  templateUrl: './close-button.component.html',
  styleUrl: './close-button.component.scss'
})
export class CloseButtonComponent extends BaseButtonComponent {
  @Input() iconSize: number = 18;
}
