import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-spinner-overlay',
  templateUrl: './spinner-overlay.component.html',
  styleUrls: ['./spinner-overlay.component.scss'],
  animations: [
    trigger('fade', [
      state('fadeOut', style({ opacity: 0 })),
      transition('* => fadeOut', animate('400ms cubic-bezier(.25,.8,.25,1)')),
    ]),
  ],
})
export class SpinnerOverlayComponent implements OnInit {
  loading = true;

  ngOnInit(): void {
    setTimeout(() => {
      this.loading = false;
    }, 3000);
  }
}
