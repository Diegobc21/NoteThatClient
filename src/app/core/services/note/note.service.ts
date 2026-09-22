import {Injectable, Injector} from '@angular/core';
import {Note, NoteDraft} from "../../../interfaces/note.interface";
import {months_ES} from "../../../utils/months_ES";
import {BaseApi} from "../base-api/base-api.service";

@Injectable({
  providedIn: 'root'
})
export class NoteService extends BaseApi<Note, NoteDraft, NoteDraft> {
  constructor(injector: Injector) {
    super(injector, 'note');
  }

  public getNoteDate(date: Date | string): string {
    const newDate: Date = new Date(date);
    const day: number = newDate.getUTCDate();
    const monthIndex: number = newDate.getUTCMonth();
    const year: number = newDate.getUTCFullYear();

    return `${day} de ${months_ES[monthIndex]?.toLowerCase()} ${year}`;
  }
}
