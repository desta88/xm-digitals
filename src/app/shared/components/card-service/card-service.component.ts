import { Component, Input, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Service } from '../../../core/model/service.model';

@Component({
  selector: 'app-card-service',
  imports: [RouterLink],
  templateUrl: './card-service.component.html',
  styleUrl: './card-service.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class CardServiceComponent {
  @Input() service?: Service;
}
