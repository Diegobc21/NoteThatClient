import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  public copyToClipboard(): void {
    console.log('copied to clipboard!')
  }
}
