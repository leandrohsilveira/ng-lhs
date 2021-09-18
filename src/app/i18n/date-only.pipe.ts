import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateOnly'
})
export class DateOnlyPipe implements PipeTransform {

  constructor(
    private datePipe: DatePipe
  ) {}

  transform(value: any, format: string): any {
    return this.datePipe.transform(value, format ?? 'dd/MM/yyyy', 'UTC');
  }

}