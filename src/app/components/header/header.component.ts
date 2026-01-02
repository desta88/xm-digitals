import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewEncapsulation, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';
import { RouterLink, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements AfterViewInit, OnInit {
  @ViewChild('typingEl') typingEl!: ElementRef<HTMLSpanElement>;

  private isBrowser: boolean;

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      gsap.registerPlugin(TextPlugin);
      
      this.updateFromRouter();
      this.router.events.pipe(
        filter(event => event instanceof NavigationEnd)
      ).subscribe(() => {
        this.updateFromRouter();
      });
    }
  }

  ngAfterViewInit(): void {
    if (this.isBrowser) {
      this.startTypingAnimation();
    }
  }

  startTypingAnimation() {
    const el = this.typingEl.nativeElement;
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 10 });

    tl.to(el, {
      duration: 3,
      text: 'Creative.\nTech. AI.',
      ease: 'none'
    });
  }

  updateFromRouter(): void {
    this.currentUrl = this.router.url;
    this.isHome = (this.currentUrl === '/' || this.currentUrl === '');
  }
  
  isHome = false;
  currentUrl = '';
}
