import { Component, OnInit } from '@angular/core';
import { fadeAnimation } from './animations/fade-in.animation';
import { Router, NavigationEnd } from '@angular/router';
import { LoaderService } from './services/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  animations: [fadeAnimation],
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  previoussize: number;
  expanded = false;
  title = 'app';
  objLoaderStatus: boolean;

  constructor(router: Router, private loaderService: LoaderService) {
    this.objLoaderStatus = false;
    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        window.scrollTo(0, 0);
      }
    });
  }

  ngOnInit(): void {
    this.loaderService.loaderStatus.subscribe((val: boolean) => {
      this.objLoaderStatus = val;
    });
  }

  onToggle() {
    this.expanded = !this.expanded;
  }
  closeMenu() {
    this.expanded = false;
  }

  getRouterOutletState(outlet) {
    return outlet.isActivated ? outlet.activatedRoute : '';
  }
}
