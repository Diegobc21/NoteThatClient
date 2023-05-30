import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {

  @Input('message') input: string = '';

  public style: {} = {};

  private _message: string;

  get message(): string {
    return this._message;
  }

  constructor() {
    this._message = 'popup';
  }

  public ngOnInit(): void {
    this.style = {};
    if (this.input !== '') {
      this._message = this.input;
    }
  }

  public close(): void {
    this.style = {display: 'none'};
  }

}
