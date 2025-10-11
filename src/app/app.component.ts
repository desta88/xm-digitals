import { AfterViewInit, Component, HostListener, ViewEncapsulation } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { MainComponent } from './components/main/main.component';
import { FooterComponent } from './components/footer/footer.component';

declare var $: any;
declare function popupSideMenu(
  sideMenu: string,
  sideMenuOpen: string,
  sideMenuCls: string,
  toggleCls: string
): void;

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, MainComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements AfterViewInit {
  title = '';

  constructor(private router: Router) {}

   ngAfterViewInit(): void {
    this.initMobileMenu();
    this.initPopupSideMenu();
    this.initShapeMockup();
    this.initStickyHeader();

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        setTimeout(() => {
          this.initMobileMenu();
          this.initShapeMockup();
          this.initStickyHeader();
        }, 0);
      }
    });
  }

  private initMobileMenu(): void {
    if ($('.mobile-menu-wrapper').length) {
      $('.mobile-menu-wrapper').mobilemenu();
    }
  }

  private initPopupSideMenu(): void {
    if ($('.sidemenu-wrapper')) {
      popupSideMenu('.sidemenu-wrapper', '.sideMenuToggler', '.sideMenuCls', 'show');
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
