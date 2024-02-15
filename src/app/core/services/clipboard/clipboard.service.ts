import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClipboardService {

  copyToClipboard(text: string): boolean {

    if(!document.queryCommandSupported('copy')) {
      return false;
    }
    const textArea = document.createElement('textarea');
    textArea.value = text;

    // Append the textarea to the document
    document.body.appendChild(textArea);

    // Select the text in the textarea
    textArea.select();

    // Execute the copy command
    const success = document.execCommand('copy');

    // Remove the textarea from the document
    document.body.removeChild(textArea);

    return success;
  }
}
