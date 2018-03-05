import { Component } from '@angular/core';
import { fadeAnimation } from './animations/fade-in.animation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  animations: [fadeAnimation],
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  previoussize: number;
  expanded = false;
  title = 'app';


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
