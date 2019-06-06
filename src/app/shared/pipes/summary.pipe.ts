import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'summary'
})
export class SummaryPipe implements PipeTransform {

  transform(value: string): string {
    let s = '';
    if (value.length > 38) {
      s = `${value.substr(0, 38)}...`;
    } else {
      s = value;
    }
    return s;
  }
}
