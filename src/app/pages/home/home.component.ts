import { Component, ViewEncapsulation } from '@angular/core';
import { HeroComponent } from "./components/hero/hero.component";
import { ServicesComponent } from "../../shared/services/services.component";

@Component({
  selector: 'app-home',
  imports: [HeroComponent, ServicesComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent {

}
