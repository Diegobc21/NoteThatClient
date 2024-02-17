import {CommonModule} from '@angular/common';
import {Component} from '@angular/core';
import {BaseButtonComponent} from "../base-button/base-button.component";
import {LucideAngularModule} from "lucide-angular";

@Component({
  selector: 'app-regular-button',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './regular-button.component.html',
  styleUrl: './regular-button.component.scss',
})
export class RegularButtonComponent  extends BaseButtonComponent{

}
