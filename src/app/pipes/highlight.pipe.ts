import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlight'
})
export class HighlightPipe implements PipeTransform {

  transform(value: string, selection: string = ''): string {
    if(selection.length>0)
    {
      const re = new RegExp(selection, 'igm');
      value = value.replace(re, '<mark>$&</mark>');
      console.log(value, re, value.search(re));
    }
    return value;
  }

}
