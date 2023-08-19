import { Component, OnInit } from '@angular/core';
import { AppService, Shipment } from './app.service';
import { SpinnerOverlayService } from './spinner-overlay/spinner-overlay.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private appService: AppService,
    private spinnerOverlayService: SpinnerOverlayService
  ) {}

  shipments!: Shipment[];
  trackingNumber: string = '';

  getShipments(trackingNumber: string) {
    this.appService.getShipments(trackingNumber).subscribe((resp) => {
      this.shipments = resp;
    });
  }

  ngOnInit(): void {
    this.spinnerOverlayService.show();

    setTimeout(() => {
      this.spinnerOverlayService.hide();
    }, 4000);
  }
}
