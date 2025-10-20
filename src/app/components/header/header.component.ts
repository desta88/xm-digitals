import { AfterViewInit, Component, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';

gsap.registerPlugin(TextPlugin);

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements AfterViewInit {
  @ViewChild('typingEl', { static: true }) typingEl!: ElementRef<HTMLSpanElement>;

  private texts = ['Creative.', 'Tech.', 'AI.'];
  private typingSpeed = 0.1; // seconds per character
  private delayBetween = 1.2; // seconds pause between words

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
}
