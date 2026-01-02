import { AfterViewInit, Component, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-hero-dark',
  imports: [RouterLink],
  templateUrl: './hero-dark.component.html',
  styleUrl: './hero-dark.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class HeroDarkComponent implements AfterViewInit {
  @ViewChild('bgVideo') video!: ElementRef<HTMLVideoElement>;

  ngAfterViewInit() {
    const v = this.video.nativeElement;
    v.muted = true;

    const playPromise = v.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        console.warn('Autoplay blocked by browser');
      });
    }
  }
}
