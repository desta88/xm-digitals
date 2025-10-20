import { AfterViewInit, Component, ViewEncapsulation } from '@angular/core';

declare var $: any;
  declare function popupSideMenu(
    sideMenu: string,
    sideMenuOpen: string,
    sideMenuCls: string,
    toggleCls: string
  ): void;
@Component({
  selector: 'app-main',
  imports: [],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class MainComponent implements AfterViewInit {
  ngAfterViewInit(): void {
     setTimeout(() => {
      const mobileMenu = $('.mobile-menu-wrapper');
      if (mobileMenu.length) {
        mobileMenu.mobilemenu();
      }
    }, 200);
  }
}

