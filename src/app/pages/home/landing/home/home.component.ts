import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { HeroDarkComponent } from '../../components/hero-dark/hero-dark.component';
import { SectionServiceComponent } from '../../components/section-service/section-service.component';
import { SectionUsecaseComponent } from '../../components/section-usecase/section-usecase.component';
import { SectionWhyusComponent } from '../../components/section-whyus/section-whyus.component';
import { SeoService } from '../../../../shared/services/seo.service';
import { GetService } from '../../../../core/model/service.model';
import { GetInsight } from '../../../../core/model/insight.model';
import { GetWhyUs } from '../../../../core/model/why-us.model';
import { MOCK_SERVICE } from '../../../../core/mock/service.mock';
import { MOCK_INSIGHT } from '../../../../core/mock/insight.mock';
import { MOCK_WHYUS } from '../../../../core/mock/why-us.mock';

@Component({
  selector: 'app-home',
  imports: [HeroDarkComponent, SectionServiceComponent, SectionUsecaseComponent, SectionWhyusComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {
  getService?: GetService;
  getInsight?: GetInsight;
  getWhyUs?: GetWhyUs

  constructor(private seo: SeoService){}

  ngOnInit(): void {
    const schemaData = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Organization",
          "name": "XM Digitals",
          "url": "https://xmdigitals.com",
          "logo": "https://xmdigitals.com/assets/images/logo-xm.png",
          "description": "End-to-end digital solutions, enhanced with AI.",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Jakarta",
            "addressCountry": "ID"
          },
          "sameAs": [
            "linkedin.com",
            "instagram.com"
          ]
        },
        {
          "@type": "WebSite",
          "url": "https://xmdigitals.com",
          "potentialAction": {
            "@type": "SearchAction",
            "target": "xmdigitals.com{search_term_string}",
            "query-input": "required name=search_term_string"
          }
        }
      ]
    };

    this.seo.update({
      title: 'End-to-End Digital Solutions, Enhanced with AI',
      description: 'XM Digitals helps businesses grow with end-to-end digital solutions — from creative, web & app development, digital growth, to optional AI-powered automation.',
      schema: schemaData
    }); 
    this.getService = MOCK_SERVICE;
    this.getInsight = MOCK_INSIGHT;
    this.getWhyUs = MOCK_WHYUS;
  }

}
