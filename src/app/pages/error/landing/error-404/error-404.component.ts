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
    const schemaData = {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": "404 | XM Digitals",
      "description": "404 - Not Found."
    }

    this.seo.update({
      title: '404 | XM Digitals',
      description: '404 - Not Found',
      schema: schemaData
    }); 
  }

}
