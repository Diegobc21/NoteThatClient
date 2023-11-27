import {Component} from '@angular/core';

@Component({
  selector: 'app-spotify',
  templateUrl: './spotify.component.html',
  styleUrls: ['./spotify.component.scss']
})
export class SpotifyComponent {

  private playlistId: string = '3LG4VzbrvVT9j8uQKnL4Oz';

  getPlaylist(): string {
    return `https://open.spotify.com/embed/playlist/3LG4VzbrvVT9j8uQKnL4Oz?utm_source=generator&theme=0`
  }
}
