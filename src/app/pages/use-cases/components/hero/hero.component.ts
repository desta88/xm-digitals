import { Component, Input, ViewEncapsulation } from '@angular/core';

import { Insight } from '../../../../core/model/insight.model';

@Component({
  selector: 'app-hero',
  imports: [],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class HeroComponent {
  @Input() insight?: Insight;
}
