import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cap'
})
export class CapitalizePipe implements PipeTransform {

  transform(value: string): string {
    return `(${value.substr(0, 1).toUpperCase})${value.substr(1, value.length - 1)}`;
  }
}
