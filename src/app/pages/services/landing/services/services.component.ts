import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { HeroComponent } from '../../components/hero/hero.component';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { SeoService } from '../../../../shared/services/seo.service';
import { MOCK_SERVICE } from '../../../../core/mock/service.mock';
import { Service } from '../../../../core/model/service.model';

@Component({
  selector: 'app-services',
  imports: [HeroComponent, RouterLink],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class ServicesComponent implements OnInit {
  service?: Service;

  constructor(
    private seo: SeoService,
    private route: ActivatedRoute,
    private router: Router
  ){}

  ngOnInit(): void { 
    this.route.paramMap.subscribe(params => {
      const slug = params.get('slug');

      this.service = MOCK_SERVICE.data.find(
        service => service.slug === slug
      );

      if (!this.service) {
        this.router.navigate(['/']);
        return;
      }

      this.seoUpdate(this.service);
    });
  }

  private seoUpdate(service: Service): void {
    if (!service) return;

    const pageTitle = service.metaTitle || 'XM Digitals Services';
    const pageDesc = service.metaDescription || 'End-to-end digital solutions by XM Digitals.';
    const pageImage = service.banner || 'xmdigitals.com';

    const schemaData = {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": pageTitle,
      "serviceType": service.metaTitle || "Technology & Software Development",
      "description": pageDesc,
      "provider": {
        "@type": "Organization",
        "name": "XM Digitals",
        "logo": "xmdigitals.com"
      },
      "areaServed": "ID"
    };

    this.seo.update({
      title: pageTitle,
      description: pageDesc,
      image: pageImage,
      schema: schemaData
    });
  }

}
