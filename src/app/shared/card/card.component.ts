import {Component, Input, OnInit} from '@angular/core';
import {OptionType} from "../../options/option-type.enum";

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
        this.title = OptionType.Note;
        break;
      case OptionType.Friends:
        this.description = 'Encuentra a tus amigos';
        this.title = OptionType.Friends;
        break;
      case OptionType.Home:
        this.description = 'Inicio';
        this.title = OptionType.Home;
        break;
      case OptionType.Spotify:
        this.description = 'Comparte tu música';
        this.title = OptionType.Spotify;
        break;
      case OptionType.Calendar:
        this.description = 'Organiza tus tareas';
        this.title = OptionType.Calendar;
        break;
      default:
        this.title = 'Título';
        this.description = 'Descripción';
    }
  }

}
