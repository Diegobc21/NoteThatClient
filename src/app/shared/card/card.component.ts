import {Component, Input, OnInit} from '@angular/core';
import {OptionType} from "../../options/optionType.enum";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input('option') public optionType!: OptionType;

  public title: string = ''
  public description: string = '';

  public ngOnInit(): void {
    this.loadCardContent();
  }

  private loadCardContent(): void {
    switch (this.optionType) {
      case OptionType.Note:
        this.description = 'Escribe tus ideas';
        this.title = 'Notas';
        break;
      default:
        this.title = 'Título';
        this.description = 'Descripción';
    }
  }

}
