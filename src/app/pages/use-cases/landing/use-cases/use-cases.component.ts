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
    this.seo.update({
      title: this.insight?.metaTitle ?? 'XM Digitals Insight',
      description: this.insight?.metaDescription,
      image: this.insight?.banner,
      url: `https://xmdigitals.com/insight/${this.insight?.slug}`,
      type: 'article'
    });
  }
}
