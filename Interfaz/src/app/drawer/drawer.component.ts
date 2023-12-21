import { Component, ViewChild } from '@angular/core';
import { IgxNavigationDrawerComponent } from 'igniteui-angular';
@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.css']
})
export class DrawerComponent {
  @ViewChild('drawer', { static: true }) drawer!: IgxNavigationDrawerComponent;
  navItems = [
    { name: 'home', text: 'Home' },
    { name: 'dashboard', text: 'Dashboard' },
    { name: 'settings', text: 'Settings' }
  ];
  selected: string = '';

  navigate(item: any) {
    this.selected = item.text;
    // Lógica de navegación aquí
  }
}
