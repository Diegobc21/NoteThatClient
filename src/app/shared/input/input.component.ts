import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss'
})
export class InputComponent {
  @Input() model: string | undefined;
  @Input() type: string = 'text';
  @Input() placeholder: string | undefined;
  @Input() required: boolean = false;

  @Output() valueChange: EventEmitter<string> = new EventEmitter<string>();

  constructor() {
  }

  public valueChanges(event: string): void {
    this.valueChange.emit(event);
  }
}
