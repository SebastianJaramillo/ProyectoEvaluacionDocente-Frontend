import { Component, ViewChild } from '@angular/core';
import { IgxNavigationDrawerComponent } from 'igniteui-angular';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  @ViewChild('drawer', { static: true }) drawer!: IgxNavigationDrawerComponent;

  toggleDrawer() {
    this.drawer.toggle();
  }
}
