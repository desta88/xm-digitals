import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-hero-dark',
  imports: [RouterLink],
  templateUrl: './hero-dark.component.html',
  styleUrl: './hero-dark.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class HeroDarkComponent {
  
}
