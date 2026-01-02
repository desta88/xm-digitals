import { AfterViewInit, Component, HostListener, ViewEncapsulation } from '@angular/core';
import { RouterLink, Router, NavigationEnd } from "@angular/router";
import { RouterOutlet } from '@angular/router';

import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

declare var $: any;
  declare function popupSideMenu(
    sideMenu: string,
    sideMenuOpen: string,
    sideMenuCls: string,
    toggleCls: string
  ): void;
  
@Component({
  selector: 'app-main',
  imports: [RouterLink, RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class MainComponent implements AfterViewInit {
  constructor(private router: Router) {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      const mobileMenu = $('.mobile-menu-wrapper');
      if (mobileMenu.length) {
        mobileMenu.mobilemenu();
      }
    }, 200);

    this.lazyLoadFontAwesome();
    this.initShapeMockup();
    this.initStickyHeader();

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        setTimeout(() => {
          this.initShapeMockup();
          this.initStickyHeader();
        }, 300);
      }
    });
  }

  private lazyLoadFontAwesome() {
    const existing = document.getElementById('fa-stylesheet');
    if (!existing) {
      const link = document.createElement('link');
      link.id = 'fa-stylesheet';
      link.rel = 'stylesheet';
      link.href = 'assets/fontawesome/css/all.min.css';
      document.head.appendChild(link);
      console.log('[FontAwesome] Loaded lazily by Angular');
    }
  }

  private initShapeMockup(): void {
    if ($('.shape-mockup').length) {
      $('.shape-mockup').shapeMockup();
    }
  }

  private initStickyHeader(): void {
    if ($('.sticky-wrapper').length) {
      $('.sticky-wrapper').stick_in_parent();
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const offset = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
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

