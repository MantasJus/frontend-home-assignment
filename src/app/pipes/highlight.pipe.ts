import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlight'
})
export class HighlightPipe implements PipeTransform {

  transform(value: string, selection: string = ''): string {
    if(selection.length>0 && value)
    {
      const re = new RegExp(selection, 'igmu');
      value = value.replace(re, '<mark>$&</mark>');
    }
    return value;
  }

}
