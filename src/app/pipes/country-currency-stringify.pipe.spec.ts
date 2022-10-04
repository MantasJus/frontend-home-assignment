import { CountryCurrencyDisplayPipe } from './country-currency-stringify.pipe';

describe('CountryCurrencyDisplayPipe', () => {
  it('create an instance', () => {
    const pipe = new CountryCurrencyDisplayPipe();
    expect(pipe).toBeTruthy();
  });
});
