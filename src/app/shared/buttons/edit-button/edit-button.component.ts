import {Component, Input} from '@angular/core';
import {BaseButtonComponent} from "../base-button/base-button.component";
import {LucideAngularModule} from "lucide-angular";

@Component({
  selector: 'app-edit-button',
  standalone: true,
  imports: [
    LucideAngularModule
  ],
  templateUrl: './edit-button.component.html',
  styleUrl: './edit-button.component.scss'
})
export class EditButtonComponent extends BaseButtonComponent {
  @Input() override iconSize: number = 18;
}
