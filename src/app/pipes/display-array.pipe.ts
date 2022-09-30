import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'arrayToString'
})
export class DisplayArrayPipe implements PipeTransform {

  transform(value: string[]): string {
    if(value == undefined || value.length <=1) return '';
    return value.reduce((sum, value) => sum + ', ' + value);
  }

}
