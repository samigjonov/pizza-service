import { Component } from "@angular/core";

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.scss']
})

export class TestimonialsComponent {
  public testimonials = [1, 2, 3].map((i) => `assets/images/testimonials/testimonial-${i}.jpg`);

}
