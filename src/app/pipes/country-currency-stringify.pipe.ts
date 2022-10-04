import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stringifyCountryCurrencies'
})
export class CountryCurrencyDisplayPipe implements PipeTransform {

  transform(value: {[key: string]: {name: string, symbol: string}}): string[] {
    if(value == undefined) return [];
    const valArray = Object.keys(value).map(curr => value[curr])
    if(valArray.length==0) return [];
    else return valArray.map(
      val => val.name + ' (' + val.symbol + ')'
      );
  }

}
