import { Component, OnInit } from '@angular/core';

import { SeoService } from '../../../../shared/services/seo.service';

@Component({
  selector: 'app-about-us',
  imports: [],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.scss'
})
export class AboutUsComponent implements OnInit {
  constructor(private seo: SeoService){}
  
  ngOnInit(): void {
    const schemaData = {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": "About Us | XM Digitals",
      "description": "Get to know our great team"
    }

    this.seo.update({
      title: 'About Us | XM Digitals',
      description: 'Get to know our great team',
      schema: schemaData
    }); 
  }

}
