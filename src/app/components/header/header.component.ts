import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';
import { RouterLink } from "@angular/router";
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

gsap.registerPlugin(TextPlugin);

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements AfterViewInit, OnInit {
  @ViewChild('typingEl', { static: true }) typingEl!: ElementRef<HTMLSpanElement>;

  private texts = ['Creative.', 'Tech.', 'AI.'];
  private typingSpeed = 0.1; // seconds per character
  private delayBetween = 1.2; // seconds pause between words
  
  isHome = false;
  currentUrl = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.updateFromRouter();
    
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.updateFromRouter();
    });
  }

  ngAfterViewInit(): void {
    this.startTypingAnimation();
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
}
