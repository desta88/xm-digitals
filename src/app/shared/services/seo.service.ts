import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { isPlatformBrowser, DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';

export interface SeoData {
  title: string;
  description?: string;
  image?: string;
  url?: string;
  keywords?: string;
  type?: 'website' | 'article';
  author?: string;
  schema?: any; // Untuk JSON-LD Dinamis
}

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  private isBrowser: boolean;
  private readonly SITE_URL = 'https://xmdigitals.com';
  private readonly BRAND_NAME = 'XM Digitals';
  private readonly DEFAULT_TITLE = 'XM Digitals | End-to-End Digital Solutions, Enhanced with AI';

  constructor(
    private router: Router,
    private titleService: Title,
    private metaService: Meta,
    @Inject(PLATFORM_ID) platformId: any,
    @Inject(DOCUMENT) private dom: Document
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  /**
   * 🎯 METHOD UTAMA: Update semua SEO dan Structured Data
   */
  update(data: SeoData): void {
    // 1. Ambil URL rute saat ini secara dinamis
    const currentRoute = this.router.url.split('?')[0]; 
    const dynamicUrl = `${this.SITE_URL}${currentRoute === '/' ? '' : currentRoute}`;
    const finalUrl = data.url || dynamicUrl;

    // 2. Format Title
    const fullTitle = this.formatTitle(data.title ?? this.DEFAULT_TITLE);
    this.titleService.setTitle(fullTitle);

    // 3. PANGGIL updateMetaTags (Tambahkan baris ini 🚀)
    // Berikan parameter finalUrl ke dalam data agar og:url sinkron
    this.updateMetaTags({ ...data, url: finalUrl }, fullTitle);

    // 4. Update Canonical
    this.updateCanonical(finalUrl);

    // 5. Update JSON-LD
    if (data.schema) {
      this.updateJsonLd(data.schema);
    }
  }

  private updateMetaTags(data: SeoData, fullTitle: string): void {
    const description = data.description || '';
    const imageUrl = this.getAbsoluteUrl(data.image || 'assets/images/logo-xm.png');

    // Gunakan pengecoran tipe (type casting) ke 'any' atau buat objek yang eksplisit
    const tags: any[] = [
      // Open Graph
      { property: 'og:title', content: fullTitle },
      { property: 'og:description', content: description },
      { property: 'og:image', content: imageUrl },
      { property: 'og:type', content: data.type ?? 'website' },
      { property: 'og:site_name', content: this.BRAND_NAME },
      { property: 'og:url', content: data.url || this.SITE_URL },
      
      // Twitter
      { name: 'twitter:title', content: fullTitle },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: imageUrl },
      { name: 'twitter:card', content: 'summary_large_image' },
      
      // Standard SEO
      { name: 'description', content: description },
      { name: 'author', content: data.author ?? this.BRAND_NAME },
      { name: 'robots', content: 'index, follow' }
    ];

    if (data.keywords) {
      tags.push({ name: 'keywords', content: data.keywords });
    }

    // Melakukan update tag satu per satu
    tags.forEach(tag => {
      this.metaService.updateTag(tag);
    });
  }

  private updateCanonical(url: string): void {
    const head = this.dom.head;
    const existing = head.querySelector('link[rel="canonical"]');
    if (existing) {
      head.removeChild(existing);
    }
    const link = this.dom.createElement('link');
    link.setAttribute('rel', 'canonical');
    link.setAttribute('href', url);
    head.appendChild(link);
  }

  private updateJsonLd(schema: any): void {
    let script = this.dom.getElementById('xm-json-ld') as HTMLScriptElement;
    if (script) {
      script.text = JSON.stringify(schema);
    } else {
      script = this.dom.createElement('script');
      script.id = 'xm-json-ld';
      script.type = 'application/ld+json';
      script.text = JSON.stringify(schema);
      this.dom.head.appendChild(script);
    }
  }

  private formatTitle(pageTitle: string): string {
    if (pageTitle.includes(this.BRAND_NAME)) return pageTitle;
    return `${pageTitle} | ${this.BRAND_NAME}`;
  }

  private getAbsoluteUrl(path: string): string {
    if (path.startsWith('http')) return path;
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    return `${this.SITE_URL}${cleanPath}`;
  }
}
