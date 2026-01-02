import { Component, Input, ViewEncapsulation } from '@angular/core';

import { WhyUs } from '../../../core/model/why-us.model';

@Component({
  selector: 'app-card-whyus',
  imports: [],
  templateUrl: './card-whyus.component.html',
  styleUrl: './card-whyus.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class CardWhyusComponent {
  @Input() whyus?: WhyUs;
}
