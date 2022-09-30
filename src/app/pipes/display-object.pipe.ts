import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'objectToString'
})
export class DisplayObjectPipe implements PipeTransform {

  transform(value: {[key: string]: string}): string {
    if(value == undefined) return '';
    const valArray = Object.keys(value).map(lang => value[lang])
    if(valArray.length==0) return '';
    else return valArray.reduce((sum, value) => sum + ', ' + value);
  }

}
