import { AfterViewInit, Component, HostListener, ViewEncapsulation, Inject, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common'; // Wajib untuk cek lingkungan
import { RouterLink, Router, NavigationEnd, RouterOutlet } from "@angular/router";
import { filter } from 'rxjs/operators';

import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

declare var $: any;

@Component({
  selector: 'app-main',
  imports: [RouterLink, RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class MainComponent implements AfterViewInit {
  private isBrowser: boolean;

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngAfterViewInit(): void {
    if (this.isBrowser) {
      this.initBrowserPlugins();
      
      this.router.events.pipe(
        filter(event => event instanceof NavigationEnd)
      ).subscribe(() => {
        setTimeout(() => {
          this.initShapeMockup();
          this.initStickyHeader();
        }, 300);
      });
    }
  }

  private initBrowserPlugins(): void {
    setTimeout(() => {
      const mobileMenu = $('.mobile-menu-wrapper');
      if (mobileMenu.length && typeof mobileMenu.mobilemenu === 'function') {
        mobileMenu.mobilemenu();
      }
    }, 200);

    this.lazyLoadFontAwesome();
    this.initShapeMockup();
    this.initStickyHeader();
  }

  private lazyLoadFontAwesome() {
    if (!this.isBrowser) return;

    const existing = document.getElementById('fa-stylesheet');
    if (!existing) {
      const link = document.createElement('link');
      link.id = 'fa-stylesheet';
      link.rel = 'stylesheet';
      link.href = 'assets/fontawesome/css/all.min.css';
      document.head.appendChild(link);
    }
  }

  private initShapeMockup(): void {
    if (this.isBrowser && $('.shape-mockup').length && typeof $('.shape-mockup').shapeMockup === 'function') {
      $('.shape-mockup').shapeMockup();
    }
  }

  private initStickyHeader(): void {
    if (this.isBrowser && $('.sticky-wrapper').length && typeof $('.sticky-wrapper').stick_in_parent === 'function') {
      $('.sticky-wrapper').stick_in_parent();
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (!this.isBrowser) return;

    const offset = window.scrollY || document.documentElement.scrollTop || 0;
    const header = document.querySelector('.sticky-wrapper');
    if (header) {
      if (offset > 500) {
        header.classList.add('header-sticky');
      } else {
        header.classList.remove('header-sticky');
      }
    }
  }
}
