import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fone'
})
export class FonePipe implements PipeTransform {

  transform(value: any): string {
    return `(${value.substr(0, 2)})${value.substr(2, 5)}-${value.substr(7, 4)}`;
  }
}
