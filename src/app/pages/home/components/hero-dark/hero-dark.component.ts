import { AfterViewInit, Component, ElementRef, ViewChild, ViewEncapsulation, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common'; // Tambahkan ini
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-hero-dark',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './hero-dark.component.html',
  styleUrl: './hero-dark.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class HeroDarkComponent implements AfterViewInit {
  @ViewChild('bgVideo') video!: ElementRef<HTMLVideoElement>;
  
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngAfterViewInit() {
    // 1. Pastikan hanya jalan di Browser (Mencegah error Prerender)
    // 2. Pastikan elemen video sudah ada (Mencegah error Hot Reload)
    if (this.isBrowser && this.video && this.video.nativeElement) {
      const v = this.video.nativeElement;
      
      v.muted = true;
      v.playsInline = true; // Sangat penting untuk Autoplay di Mobile

      // Gunakan setTimeout 0 untuk memastikan DOM benar-benar stabil saat HMR
      setTimeout(() => {
        const playPromise = v.play();
        if (playPromise !== undefined) {
          playPromise.catch((error) => {
            console.warn('Autoplay blocked or interrupted:', error);
          });
        }
      }, 0);
    }
  }
}
