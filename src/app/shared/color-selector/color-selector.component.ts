import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-color-selector',
  templateUrl: './color-selector.component.html',
  styleUrls: ['./color-selector.component.scss']
})
export class ColorSelectorComponent {

  @Output() colorSelected: EventEmitter<string> = new EventEmitter<string>();

  selectedColor: string = '';

  public onColorChange(): void {
    this.colorSelected.emit(this.selectedColor);
  }

}
