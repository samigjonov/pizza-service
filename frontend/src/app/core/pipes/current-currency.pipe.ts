import { Pipe, PipeTransform } from "@angular/core";

@Pipe({name: 'currentCurrency'})
export class CurrentCurrencyPipe implements PipeTransform {
  public currentCurrency = 'usd';
  public rate = 1;

  constructor() {
    this.currentCurrency = localStorage.getItem('currency') === 'eur' ? 'eur' : 'usd';
    this.rate = localStorage.getItem('rate') ? parseFloat(localStorage.getItem('rate')) : 1;
  }

  transform(value: number) {
    return this.currentCurrency === 'usd' ? `$${value.toFixed(2)}` : `€ ${(value * this.rate).toFixed(2)}`;
  }
}
