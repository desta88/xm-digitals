import { Component, Input, ViewEncapsulation } from '@angular/core';

import { CardWhyusComponent } from '../../../../shared/components/card-whyus/card-whyus.component';
import { GetWhyUs } from '../../../../core/model/why-us.model';

@Component({
  selector: 'app-section-whyus',
  imports: [CardWhyusComponent],
  templateUrl: './section-whyus.component.html',
  styleUrl: './section-whyus.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class SectionWhyusComponent {
  @Input() getWhyUs?: GetWhyUs;
}
