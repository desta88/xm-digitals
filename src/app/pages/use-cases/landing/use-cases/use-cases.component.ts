import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { HeroComponent } from '../../components/hero/hero.component';
import { SeoService } from '../../../../shared/services/seo.service';
import { MOCK_INSIGHT } from '../../../../core/mock/insight.mock';
import { Insight } from '../../../../core/model/insight.model';

@Component({
  selector: 'app-use-cases',
  imports: [RouterLink, HeroComponent],
  templateUrl: './use-cases.component.html',
  styleUrl: './use-cases.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class UseCasesComponent implements OnInit {
  insight?: Insight;

  constructor(
    private seo: SeoService,
    private route: ActivatedRoute,
    private router: Router
  ){}

  ngOnInit(): void { 
    this.route.paramMap.subscribe(params => {
      const slug = params.get('slug');

      this.insight = MOCK_INSIGHT.data.find(
        insight => insight.slug === slug
      );

      if (!this.insight) {
        this.router.navigate(['/']);
        return;
      }

      this.seoUpdate(this.insight);
    });
  }

  private seoUpdate(insight: Insight): void {
    if (!insight) return;

    const pageTitle = insight.metaTitle || 'Use Cases';
    const pageDesc = insight.metaDescription || 'Read our use cases.';
    const pageImage = insight.banner || 'xmdigitals.com';
    const datePublished = new Date().toISOString(); 

    const schemaData = {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": pageTitle,
      "description": pageDesc,
      "image": pageImage,
      "datePublished": datePublished,
      "author": {
        "@type": "Organization",
        "name": "XM Digitals",
        "url": "https://xmdigitals.com"
      },
      "publisher": {
        "@type": "Organization",
        "name": "XM Digitals",
        "logo": { 
          "@type": "ImageObject", 
          "url": "https://xmdigitals.com/assets/images/logo-xm.png"
        }
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `xmdigitals.com{insight.slug}`
      }
    };

    this.seo.update({
      title: pageTitle,
      description: pageDesc,
      image: pageImage,
      type: 'article',
      schema: schemaData
    });
  }

}
