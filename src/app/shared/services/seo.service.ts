import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';
import { isPlatformBrowser } from '@angular/common';

export interface SeoData {
  title: string;           // Required: "Our Services"
  description?: string;    // Optional: akan gunakan default jika tidak ada
  image?: string;         // Optional: path relatif atau URL absolut
  url?: string;          // Optional: canonical URL
  keywords?: string;     // Optional: comma separated
  type?: 'website' | 'article'; // Default: 'website'
  author?: string;       // Optional
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
    private titleService: Title,
    private metaService: Meta,
    @Inject(PLATFORM_ID) platformId: any
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }
  
  /**
   * 🎯 MAIN PUBLIC METHOD - Update semua SEO tags
   * Dipanggil dari component dengan data spesifik
   */
  update(data: SeoData): void {
    if (!this.isBrowser) return;
    
    console.log('🔄 Updating SEO with:', data);
    
    // 🚀 EXECUTE SEMUA UPDATE SECARA INSTANT
    const title = data.title ?? this.DEFAULT_TITLE;
    this.updateTitle(title);
    
    if (data.description) {
      this.updateDescription(data.description);
    }
    
    if (data.image) {
      this.updateImage(data.image);
    }
    
    if (data.url) {
      this.updateUrl(data.url);
    }
    
    if (data.keywords) {
      this.updateKeywords(data.keywords);
    }
    
    if (data.type) {
      this.updateMeta({ property: 'og:type', content: data.type });
    }
    
    if (data.author) {
      this.updateMeta({ name: 'author', content: data.author });
    }
    
    // 🎯 OPTIONAL: Update additional meta tags
    this.updateAdditionalMeta();
  }
  
  /**
   * 🚀 UPDATE TITLE (Paling penting!)
   */
  private updateTitle(pageTitle: string): void {
    const fullTitle = this.formatTitle(pageTitle);
    
    // 1. Update browser tab title
    this.titleService.setTitle(fullTitle);
    
    // 2. Update Open Graph title
    this.updateMeta({ property: 'og:title', content: fullTitle });
    
    // 3. Update Twitter title
    this.updateMeta({ name: 'twitter:title', content: fullTitle });
    
    console.log('✅ Title updated:', fullTitle);
  }
  
  /**
   * 🚀 FORMAT TITLE dengan brand name
   */
  private formatTitle(pageTitle: string): string {
    // Pastikan tidak double brand name
    if (pageTitle.includes(this.BRAND_NAME) || pageTitle.includes('|')) {
      return pageTitle;
    }
    
    return `${pageTitle} | ${this.BRAND_NAME}`;
  }
  
  /**
   * 🚀 UPDATE DESCRIPTION
   */
  private updateDescription(description: string): void {
    // 1. Meta description
    this.updateMeta({ name: 'description', content: description });
    
    // 2. Open Graph description
    this.updateMeta({ property: 'og:description', content: description });
    
    // 3. Twitter description
    this.updateMeta({ name: 'twitter:description', content: description });
    
    console.log('✅ Description updated:', description.substring(0, 50) + '...');
  }
  
  /**
   * 🚀 UPDATE IMAGE
   */
  private updateImage(imagePath: string): void {
    const imageUrl = this.getAbsoluteUrl(imagePath);
    
    // 1. Open Graph image
    this.updateMeta({ 
      property: 'og:image', 
      content: imageUrl 
    });
    
    // 2. Twitter image
    this.updateMeta({ 
      name: 'twitter:image', 
      content: imageUrl 
    });
    
    // 3. Optional: Image dimensions
    this.updateMeta({ property: 'og:image:width', content: '1200' });
    this.updateMeta({ property: 'og:image:height', content: '630' });
    
    console.log('✅ Image updated:', imageUrl);
  }
  
  /**
   * 🚀 UPDATE URL & CANONICAL
   */
  private updateUrl(url: string): void {
    // 1. Open Graph URL
    this.updateMeta({ property: 'og:url', content: url });
    
    // 2. Update canonical URL
    this.updateCanonical(url);
    
    console.log('✅ URL updated:', url);
  }
  
  /**
   * 🚀 UPDATE CANONICAL URL
   */
  private updateCanonical(url: string): void {
    // Hapus semua canonical link yang ada
    const existingLinks = document.querySelectorAll('link[rel="canonical"]');
    existingLinks.forEach(link => link.remove());
    
    // Buat canonical link baru
    const link = document.createElement('link');
    link.rel = 'canonical';
    link.href = url;
    document.head.appendChild(link);
  }
  
  /**
   * 🚀 UPDATE KEYWORDS
   */
  private updateKeywords(keywords: string): void {
    this.updateMeta({ name: 'keywords', content: keywords });
    console.log('✅ Keywords updated');
  }
  
  /**
   * 🚀 UPDATE META TAG (helper)
   */
  private updateMeta(meta: MetaDefinition): void {
    try {
      this.metaService.updateTag(meta);
    } catch (error) {
      console.warn('Failed to update meta tag:', meta, error);
      
      // Fallback: Update via DOM langsung
      this.updateMetaViaDom(meta);
    }
  }
  
  /**
   * 🚀 UPDATE META VIA DOM (fallback)
   */
  private updateMetaViaDom(meta: MetaDefinition): void {
    const attr = meta.property ? 'property' : 'name';
    const value = meta.property || meta.name || '';
    
    if (!value || !meta.content) return;
    
    // Cari element
    const selector = `[${attr}="${value}"]`;
    let element = document.querySelector(`meta${selector}`) as HTMLMetaElement;
    
    // Buat baru jika tidak ada
    if (!element) {
      element = document.createElement('meta');
      if (meta.property) {
        element.setAttribute('property', value);
      } else if (meta.name) {
        element.setAttribute('name', value);
      }
      document.head.appendChild(element);
    }
    
    // Update content
    element.content = meta.content;
  }
  
  /**
   * 🎯 UPDATE ADDITIONAL META TAGS
   */
  private updateAdditionalMeta(): void {
    // 1. Open Graph site name
    this.updateMeta({ property: 'og:site_name', content: this.BRAND_NAME });
    
    // 2. Twitter card type
    this.updateMeta({ name: 'twitter:card', content: 'summary_large_image' });
    
    // 3. Twitter site (jika ada)
    this.updateMeta({ name: 'twitter:site', content: '@xmdigitals' });
    
    // 4. Robots (default)
    this.updateMeta({ name: 'robots', content: 'index, follow' });
  }
  
  /**
   * 🚀 GET ABSOLUTE URL
   */
  private getAbsoluteUrl(path: string): string {
    // Jika sudah URL absolut
    if (path.startsWith('http://') || path.startsWith('https://')) {
      return path;
    }
    
    // Jika path relatif dengan slash
    if (path.startsWith('/')) {
      return `${this.SITE_URL}${path}`;
    }
    
    // Default ke assets images
    return `${this.SITE_URL}/${path}`;
  }

}