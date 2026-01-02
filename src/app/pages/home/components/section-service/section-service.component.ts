import { Component, Input, ViewEncapsulation } from '@angular/core';

import { CardServiceComponent } from '../../../../shared/components/card-service/card-service.component';
import { GetService } from '../../../../core/model/service.model';

@Component({
  selector: 'app-section-service',
  imports: [CardServiceComponent],
  templateUrl: './section-service.component.html',
  styleUrl: './section-service.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class SectionServiceComponent {
  @Input() getService?: GetService;
}
