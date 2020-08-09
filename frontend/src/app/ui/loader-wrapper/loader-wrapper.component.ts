import { Component, Input } from "@angular/core";

@Component({
  selector: 'app-loader-wrapper',
  templateUrl: './loader-wrapper.component.html',
  styleUrls: ['./loader-wrapper.component.scss']
})

export class LoaderWrapperComponent {
  @Input() public loading = false;
}
