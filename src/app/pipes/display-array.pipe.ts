import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'arrayToString'
})
export class DisplayArrayPipe implements PipeTransform {

  transform(value: string[] | number[], seperator?: string): string {
    if(value == undefined || value.length <1) return '';
    if(seperator==null) seperator = ', ';
    return value.map(val => val.toString()).reduce((sum, value) => sum + seperator + value);
  }

}
