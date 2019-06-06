import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'summary2'
})
export class Summary2Pipe implements PipeTransform {

  transform(value: string): string {
    let s = '';
    if (value.length > 34) {
      s = `${value.substr(0, 34)}...`;
    } else {
      s = value;
    }
    return s;
  }
}
