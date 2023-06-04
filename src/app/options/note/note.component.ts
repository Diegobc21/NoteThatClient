import {Component, OnDestroy} from '@angular/core';
import {Note} from "../../interfaces/note.interface";
import {NoteService} from "../../core/services/note.service";
import {Subscription} from "rxjs";
import {AlertType} from "../../shared/alert/alert-type";
import {SpinnerService} from "../../core/services/spinner.service";

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnDestroy {

  private _noteList: Note[] = [];
  private subscriptions: Subscription[] = [];

  protected readonly AlertType = AlertType;

  constructor(
    private noteService: NoteService,
    public spinnerService: SpinnerService
  ) {
    this.startSubscriptions();
  }

  get nodeList(): Note[] {
    return this._noteList;
  }

  private startSubscriptions(): void {
    this.subscriptions.push(
      this.noteService.getNotes().subscribe((notes: any) => {
        if (notes.length > 0) {
          this._noteList = notes;
          console.log(this._noteList);
        }
      })
    )
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach((sub: Subscription) => sub.unsubscribe());
  }

}
