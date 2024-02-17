import {Component, Input} from '@angular/core';
import {BaseButtonComponent} from "../base-button/base-button.component";
import {LucideAngularModule} from "lucide-angular";

@Component({
  selector: 'app-show-password-button',
  standalone: true,
  imports: [
    LucideAngularModule
  ],
  templateUrl: './show-password-button.component.html',
  styleUrl: './show-password-button.component.scss'
})
export class ShowPasswordButtonComponent extends BaseButtonComponent {
  @Input() visible: boolean = false;
  @Input() iconSize: number = 18;

}
