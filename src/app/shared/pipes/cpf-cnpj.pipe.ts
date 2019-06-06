import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cpfCnpj'
})
export class CpfCnpjPipe implements PipeTransform {

  transform(value: string): any {
    if (value) {
      value = value.toString();

      if (value.length === 11) {
        return value.substring(0, 3).concat('.')
          .concat(value.substring(3, 6))
          .concat('.')
          .concat(value.substring(6, 9))
          .concat('-')
          .concat(value.substring(9, 11));
      }

      if (value.length === 14) {
        return value.substring(0, 2).concat('.')
          .concat(value.substring(2, 5))
          .concat('.')
          .concat(value.substring(5, 8))
          .concat('/')
          .concat(value.substring(8, 12))
          .concat('-')
          .concat(value.substring(12, 14));
      }
      return value;
    }
  }

}
