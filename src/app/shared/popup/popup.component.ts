import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {

  @Input('message') input: string = '';

  private _message: string;

  get message(): string {
    return this._message;
  }

  constructor() {
    this._message = 'popup';
  }

  public ngOnInit(): void {
    if (this.input !== '') {
      this._message = this.input;
    }
  }

}
