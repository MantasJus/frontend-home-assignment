import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'arrayToString'
})
export class DisplayArrayPipe implements PipeTransform {

  transform(value: string[]): string {
    if(value.length <=1) return value[0];
    return value.reduce((sum, value) => sum + ', ' + value);
  }

}
