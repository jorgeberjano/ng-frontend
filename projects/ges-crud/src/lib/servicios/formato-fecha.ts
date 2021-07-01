import { NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Injectable } from '@angular/core';
import { isNumber } from 'util';

@Injectable()
export class CustomDateParserFormatter extends NgbDateParserFormatter {

  public parse(value: string): NgbDateStruct {
    if (!value) {
      return null;
    }
    const dateParts = value.trim().split('/');
    if (dateParts.length != 3) {
      return null;
    }
    const day = this.toInteger(dateParts[0]);
    const month = this.toInteger(dateParts[1]);
    const year = this.toInteger(dateParts[2]);

    if (day && month && year) {
      return {day: day, month: month, year: year};
    }
    return null;
  }

  public format(date: NgbDateStruct): string {
    return date ?
        `${isNumber(date.day) ? this.padNumber(date.day) : ''}/${isNumber(date.month) ? this.padNumber(date.month) : ''}/${date.year}` :
        '';
  }

  private toInteger(s: string): number {
    return parseInt(s, 10);
  }

  private padNumber(n: number): string {
    if (n < 10) {
      return '0' + n.toString();
    } else {
      return n.toString();
    }
  }
}
