import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DHL_API_KEY } from 'env';
import { catchError, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor(private readonly http: HttpClient) {}

  // ! FOR PRODUCTION
  /* getShipments(trackingNumber: string) {
    return this.http.get<Shipments>(
      `https://api-eu.dhl.com/track/shipments?trackingNumber=${trackingNumber}`,
      { headers: { 'DHL-API-KEY': DHL_API_KEY } }
    ).pipe(map((resp) => resp.shipments));
  } */

  // ! FOR LOCAL ENV ONLY
  getShipments(trackingNumber: string) {
    return this.http
      .get<Shipment[]>(
        `https://api-eu.dhl.com/track/shipments?trackingNumber=${trackingNumber}`,
        { headers: { 'DHL-API-KEY': DHL_API_KEY } }
      )
      .pipe(
        catchError(() => {
          return of(this.response.shipments);
        }),
        tap(() => {
          return this.response.shipments;
        })
      );
  }

  // have to mock the response for now, i have no working trackingnumber
  response: Shipments = {
    shipments: [
      {
        id: '00340434292135100186',
        service: 'ecommerce',
        origin: {
          address: {
            countryCode: 'US',
            postalCode: '41048',
            addressLocality: 'HEBRON',
          },
        },
        destination: {
          address: {
            countryCode: 'US',
            postalCode: '89014',
            addressLocality: 'HENDERSON',
          },
        },
        status: {
          timestamp: '2023-05-08T10:37:00',
          location: {
            address: {
              countryCode: 'US',
              postalCode: '89014',
              addressLocality: 'Henderson, NV, US',
            },
          },
          statusCode: 'delivered',
          status: 'DELIVERED',
          description: 'DELIVERED - PARCEL LOCKER',
        },
        details: {
          product: {
            productName: 'DHL SM Parcel Plus Expedited',
          },
          weight: {
            value: 1.352,
            unitText: 'LB',
          },
          references: [
            {
              number: '756789',
              type: 'customer-reference',
            },
            {
              number: '20230fkl87654',
              type: 'customer-confirmation-number',
            },
            {
              number: '6100050512345',
              type: 'ecommerce-number',
            },
            {
              number: '936109876h8ikj8',
              type: 'local-tracking-number',
            },
          ],
        },
        events: [
          {
            timestamp: '2023-05-08T10:37:00',
            location: {
              address: {
                countryCode: 'US',
                postalCode: '89014',
                addressLocality: 'Henderson, NV, US',
              },
            },
            statusCode: 'delivered',
            status: 'DELIVERED',
            description: 'DELIVERED - PARCEL LOCKER',
          },
          {
            timestamp: '2023-05-08T06:10:00',
            location: {
              address: {
                countryCode: 'US',
                postalCode: '89014',
                addressLocality: 'Henderson, NV, US',
              },
            },
            statusCode: 'transit',
            status: 'OUT FOR DELIVERY',
          },
          {
            timestamp: '2023-05-08T01:17:00',
            location: {
              address: {
                countryCode: 'US',
                postalCode: '89012',
                addressLocality: 'Henderson, NV, US',
              },
            },
            statusCode: 'transit',
            status: 'ARRIVAL AT POST OFFICE',
          },
          {
            timestamp: '2023-05-08T00:02:00',
            location: {
              address: {
                countryCode: 'US',
                postalCode: '89012',
                addressLocality: 'Henderson, NV, US',
              },
            },
            statusCode: 'transit',
            status: 'ARRIVED USPS SORT FACILITY',
          },
          {
            timestamp: '2023-05-06T04:18:30',
            location: {
              address: {
                countryCode: 'US',
                postalCode: '90601',
                addressLocality: 'Whittier, CA, US',
              },
            },
            statusCode: 'transit',
            status: 'TENDERED TO DELIVERY SERVICE PROVIDER',
          },
          {
            timestamp: '2023-05-05T10:51:20',
            location: {
              address: {
                countryCode: 'US',
                postalCode: '90601',
                addressLocality: 'Whittier, CA, US',
              },
            },
            statusCode: 'transit',
            status: 'ARRIVAL DESTINATION DHL ECOMMERCE FACILITY',
          },
          {
            timestamp: '2023-05-03T14:27:32',
            location: {
              address: {
                countryCode: 'US',
                postalCode: '41048',
                addressLocality: 'Hebron, KY, US',
              },
            },
            statusCode: 'transit',
            status: 'DEPARTURE ORIGIN DHL ECOMMERCE FACILITY',
          },
          {
            timestamp: '2023-05-03T01:10:21',
            location: {
              address: {
                countryCode: 'US',
                postalCode: '41048',
                addressLocality: 'Hebron, KY, US',
              },
            },
            statusCode: 'transit',
            status: 'PROCESSED',
          },
          {
            timestamp: '2023-05-02T19:25:28',
            location: {
              address: {
                countryCode: 'US',
                postalCode: '41048',
                addressLocality: 'Hebron, KY, US',
              },
            },
            statusCode: 'transit',
            status: 'PACKAGE RECEIVED AT DHL ECOMMERCE DISTRIBUTION CENTER',
          },
          {
            timestamp: '2023-05-01T14:11:21',
            statusCode: 'pre-transit',
            status: 'EN ROUTE TO DHL ECOMMERCE OR AWAITING PROCESSING',
          },
          {
            timestamp: '2023-05-01T14:05:23',
            statusCode: 'pre-transit',
            status:
              'DHL ECOMMERCE CURRENTLY AWAITING SHIPMENT AND TRACKING WILL BE UPDATED WHEN RECEIVED',
          },
          {
            timestamp: '2023-05-01T10:02:48',
            statusCode: 'unknown',
            status: 'LABEL CREATED',
          },
        ],
      },
    ],
  };
}

export interface Shipments {
  shipments: Shipment[];
}

export interface Shipment {
  id: string;
  service: string;
  origin: Destination;
  destination: Destination;
  status: Status;
  details: Details;
  events: Status[];
}

export interface Destination {
  address: Address;
}

export interface Address {
  countryCode: String;
  postalCode: string;
  addressLocality: string;
}

export interface Details {
  product: Product;
  weight: Weight;
  references: Reference[];
}

export interface Product {
  productName: string;
}

export interface Reference {
  number: string;
  type: string;
}

export interface Weight {
  value: number;
  unitText: string;
}

export interface Status {
  timestamp: string;
  location?: Destination;
  statusCode: string;
  status: string;
  description?: string;
}
