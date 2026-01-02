import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { HeroDetailComponent } from '../../components/hero-detail/hero-detail.component';
import { SeoService } from '../../../../shared/services/seo.service';
import { MOCK_DETAIL_SERVICE } from '../../../../core/mock/service.mock';
import { DetailService } from '../../../../core/model/service.model';

@Component({
  selector: 'app-detail-services',
  imports: [RouterLink, HeroDetailComponent],
  templateUrl: './detail-services.component.html',
  styleUrl: './detail-services.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class DetailServicesComponent implements OnInit {
  detailService?: DetailService;

  constructor(
    private seo: SeoService,
    private route: ActivatedRoute,
    private router: Router
  ){}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const slug = params.get('detailSlug');

      this.detailService = MOCK_DETAIL_SERVICE.data.find(
        detailService => detailService.slug === slug
      );

      if (!this.detailService) {
        this.router.navigate(['/']);
        return;
      }

      this.seoUpdate(this.detailService);
    });
  }

  private seoUpdate(detailService: DetailService): void {
    this.seo.update({
      title: this.detailService?.metaTitle ?? 'XM Digitals Detail Service',
      description: this.detailService?.metaDescription,
      image: this.detailService?.banner,
      url: `https://xmdigitals.com/services/${this.detailService?.slug}`,
      type: 'article'
    });
  }

}
