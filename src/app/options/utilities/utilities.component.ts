import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-utilities',
  templateUrl: './utilities.component.html',
  styleUrl: './utilities.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UtilitiesComponent {
  convertedImage: string | null = null;

  convertToWebP(file: any) {
    if (file){
    const reader = new FileReader();

    reader.onload = (e: any) => {
      const img = new Image();
      img.src = e.target.result;

      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        canvas.width = img.width;
        canvas.height = img.height;

        ctx?.drawImage(img, 0, 0);

        canvas.toBlob(
          (blob) => {
            const url = URL.createObjectURL(blob!);
            this.convertedImage = url;
          },
          'image/webp',
          1
        );
      };
    };

    reader.readAsDataURL(file);
  } else {
    console.log('No file found')
  }
}

}
