import { Component } from "@angular/core";

@Component({
  selector: 'app-partners',
  templateUrl: './partners.component.html',
  styleUrls: ['./partners.component.scss']
})

export class PartnersComponent {
  public partners = [1, 2, 3, 4].map((i) => `assets/images/partners/partner-${i}.png`);
}
