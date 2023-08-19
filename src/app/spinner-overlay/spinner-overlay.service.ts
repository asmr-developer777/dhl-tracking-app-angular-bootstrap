import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { SpinnerOverlayComponent } from './spinner-overlay.component';

@Injectable({
  providedIn: 'root',
})
export class SpinnerOverlayService {
  constructor(private overlay: Overlay) {}

  private overlayRef!: OverlayRef;

  public show() {
    if (!this.overlayRef) {
      this.overlayRef = this.overlay.create();
    }

    const spinnerOverlayPortal = new ComponentPortal(SpinnerOverlayComponent);
    const component = this.overlayRef.attach(spinnerOverlayPortal);
  }

  public hide() {
    if (!!this.overlayRef) {
      this.overlayRef.detach();
    }
  }
}
