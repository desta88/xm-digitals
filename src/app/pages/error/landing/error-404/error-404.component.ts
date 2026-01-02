import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';

import { SeoService } from '../../../../shared/services/seo.service';

@Component({
  selector: 'app-error-404',
  imports: [RouterLink],
  templateUrl: './error-404.component.html',
  styleUrl: './error-404.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class Error404Component implements OnInit {

  constructor(private seo: SeoService){}

  ngOnInit(): void {
    this.seo.update({
      title: 'End-to-End Digital Solutions, Enhanced with AI',
      description: 'XM Digitals helps businesses grow with end-to-end digital solutions — from creative, web & app development, digital growth, to optional AI-powered automation.',
      image: '/assets/images/home-og.jpg',
      url: 'https://xmdigitals.com'
    }); 
  }

}
