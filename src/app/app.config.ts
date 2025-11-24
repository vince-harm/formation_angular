import {ApplicationConfig, Injectable, LOCALE_ID, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, NativeDateAdapter} from '@angular/material/core';
import {provideHttpClient} from '@angular/common/http';
import {formatDate} from '@angular/common';


/**
 * This custom date adapter is used to parse and format dates in the format dd/MM/yyyy.
 * It extends the Angular Material NativeDateAdapter and overrides the parse and format methods.
 * It's necessary to use this adapter so the date picker can parse and format dates in the format dd/MM/yyyy.
 */
@Injectable()
export class FrBeLocaleDateAdapter extends NativeDateAdapter {
  override getFirstDayOfWeek(): number {
    return 1;
  }

  override parse(value: any): Date | null {
    if (typeof value === 'string' && value.length > 0) {
      const parts = value.trim().split('/');
      if (parts.length === 3) {
        const day = +parts[0];
        const month = +parts[1] - 1;
        const year = +parts[2];
        const date = new Date(year, month, day);
        if (
          !Number.isNaN(date.getTime()) &&
          date.getDate() === day &&
          date.getMonth() === month &&
          date.getFullYear() === year
        ) {
          return date;
        }
        return null;
      }
    }
    const timestamp = typeof value === 'number' ? value : Date.parse(value);
    return Number.isNaN(timestamp) ? null : new Date(timestamp);
  }

  override format(date: Date, displayFormat: Object): string {
    if (!date) {
      return '';
    }
    return formatDate(date, "dd/MM/yyyy", "fr-BE");
  }
}

export const CUSTOM_DATE_FORMATS = {
  parse: {
    dateInput: 'dd/MM/yyyy',
    timeInput: 'H:mm',
  },
  display: {
    dateInput: 'dd/MM/yyyy',
    monthYearLabel: 'MMMM yyyy',
    dateA11yLabel: 'fullDate',
    monthYearA11yLabel: 'MMMM yyyy',
    timeInput: 'H:mm',
    timeOptionLabel: 'H:mm',
  },
};


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes),
    {provide: DateAdapter, useClass: FrBeLocaleDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: CUSTOM_DATE_FORMATS},
    {provide: MAT_DATE_LOCALE, useValue: 'fr-BE'},
    {provide: LOCALE_ID, useValue: 'fr-BE'},
    provideHttpClient()
  ]
};
