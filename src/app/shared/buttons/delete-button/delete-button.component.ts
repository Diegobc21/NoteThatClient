import {Component, Input} from '@angular/core';
import {BaseButtonComponent} from "../base-button/base-button.component";
import {LucideAngularModule} from "lucide-angular";

@Component({
  selector: 'app-delete-button',
  standalone: true,
  imports: [
    LucideAngularModule
  ],
  templateUrl: './delete-button.component.html',
  styleUrl: './delete-button.component.scss'
})
export class DeleteButtonComponent extends BaseButtonComponent {
  @Input() override iconSize: number = 18;
}
