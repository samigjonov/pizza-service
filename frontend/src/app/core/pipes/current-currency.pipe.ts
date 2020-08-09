import { Pipe, PipeTransform } from "@angular/core";
import { RateService } from "../services/rate.service";

@Pipe({name: 'currentCurrency'})
export class CurrentCurrencyPipe implements PipeTransform {
  public currentCurrency = 'usd';
  public rate = 1;

  constructor(private rateService: RateService) {
    this.currentCurrency = this.rateService.getCurrentCurrency();
    this.rate = this.rateService.getCurrentRate();
  }

  transform(value: number) {
    return this.currentCurrency === 'usd' ? `$${value.toFixed(2)}` : `€ ${(value * this.rate).toFixed(2)}`;
  }
}
