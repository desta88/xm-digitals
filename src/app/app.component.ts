import { Component, OnInit, ViewEncapsulation, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common'; // Wajib untuk cek lingkungan
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

import { MainComponent } from './components/main/main.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MainComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  private isBrowser: boolean;

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) platformId: Object // Inject platform ID
  ) {
    // Tentukan apakah kita sedang berada di browser atau server
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit() {
    // Hanya jalankan window.scrollTo jika berada di browser
    if (this.isBrowser) {
      this.router.events.pipe(
        filter(event => event instanceof NavigationEnd)
      ).subscribe(() => {
        window.scrollTo(0, 0);
      });
    }
  }
}
