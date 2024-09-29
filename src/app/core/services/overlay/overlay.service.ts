import {Injectable, signal} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class OverlayService {
    private overlayVisible = signal<boolean>(false);

    isOverlayVisible() {
        return this.overlayVisible;
    }

    showOverlay() {
        this.overlayVisible.set(true);
    }

    hideOverlay() {
        this.overlayVisible.set(false);
    }
}
