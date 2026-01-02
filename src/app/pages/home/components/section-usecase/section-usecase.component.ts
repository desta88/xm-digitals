import { Component, Input, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';

import { GetInsight } from '../../../../core/model/insight.model';

@Component({
  selector: 'app-section-usecase',
  imports: [RouterLink],
  templateUrl: './section-usecase.component.html',
  styleUrl: './section-usecase.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class SectionUsecaseComponent {
  @Input() getInsight?: GetInsight;
}
