import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

import { Service } from '../../../../core/model/service.model';


@Component({
  selector: 'app-hero',
  imports: [],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class HeroComponent {
  @Input() service?: Service;
}
