import { Component, Input, ViewEncapsulation } from '@angular/core';

import { DetailService } from '../../../../core/model/service.model';

@Component({
  selector: 'app-hero-detail',
  imports: [],
  templateUrl: './hero-detail.component.html',
  styleUrl: './hero-detail.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class HeroDetailComponent {
  @Input() detailService?: DetailService;
}
