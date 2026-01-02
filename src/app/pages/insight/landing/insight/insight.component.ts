import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

import { SeoService } from '../../../../shared/services/seo.service';

@Component({
  selector: 'app-insight',
  imports: [RouterLink],
  templateUrl: './insight.component.html',
  styleUrl: './insight.component.scss'
})
export class InsightComponent implements OnInit {
  constructor(private seo: SeoService){}

  ngOnInit(): void {
    const schemaData = {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": "Insights | XM Digitals",
      "description": "Latest trends in AI, Technology, and Digital Growth."
    }

    this.seo.update({
      title: 'Insights | XM Digitals',
      description: 'Latest trends in AI, Technology, and Digital Growth.',
      schema: schemaData
    }); 
  }

}
