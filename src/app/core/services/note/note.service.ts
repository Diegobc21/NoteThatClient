import {Injectable} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../auth/auth.service";
import {Note} from "../../../interfaces/note.interface";

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  private endpoint: string = environment.apiUrl + `/note`;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {
  }

  public addNote(note: Note): Observable<Note> {
    return this.authService.checkConnection(this.http.post<Note>(this.endpoint, note, {
      headers: this.authService.getHeaders()
    }));
  }

  public editNote(note: Note): Observable<Note> {
    return this.authService.checkConnection(this.http.put<Note>(`${this.endpoint}/${note._id}`, note, {
      headers: this.authService.getHeaders()
    }));
  }

  public deleteOne(note: Note): Observable<string> {
    return this.authService.checkConnection(this.http.delete<string>(`${this.endpoint}/${note._id}`, {
      headers: this.authService.getHeaders()
    }));
  }

  public getNotes(): Observable<any> {
    return this.authService.checkConnection(
      this.http.get(`${this.endpoint}?email=${this.authService.email}`, {
          headers: this.authService.getHeaders()
        }
      )
    );
  }
}
