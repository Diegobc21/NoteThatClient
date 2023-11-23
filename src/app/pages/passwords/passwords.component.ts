import { Component } from '@angular/core';

@Component({
  selector: 'app-passwords',
  templateUrl: './passwords.component.html',
  styleUrl: './passwords.component.scss',
})
export class PasswordsComponent {
  triggerVisibility(): void {
    console.log('ver');
  }

  delete(): void {
    console.log('borrar');
  }
}
