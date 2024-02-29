import {
  Component,
  ViewChild,
  OnInit,
  Output,
  EventEmitter,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IgxNavigationDrawerComponent } from 'igniteui-angular';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-navbar-admin',
  templateUrl: './navbar-admin.component.html',
  styleUrls: ['./navbar-admin.component.css'],
})
export class NavbarAdminComponent {
  @Output() newItemEvent = new EventEmitter<string>();

  addNewItem(value: string) {
    this.newItemEvent.emit(value);
  }

  @ViewChild('drawer', { static: true }) drawer!: IgxNavigationDrawerComponent;

  toggleDrawer() {
    this.drawer.toggle();
  }
  id: any;
  alumno: any = {};
  user: any = {};
  userIdActual: any;

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit(): void {
    const idUser = localStorage.getItem('idUser');
    const role = localStorage.getItem('role');

    if (idUser && role) {
      this.findUsuario(atob(idUser));
    } else {
      localStorage.clear();
      this.router.navigate(['']);
    }
  }

  findUsuario(id: string): any {
    this.userService.findById(id).subscribe(
      (data) => {
        this.user = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  salir() {
    localStorage.clear();
    this.router.navigate(['']);
  }

  periodo() {
    this.router.navigate(['periodoAdmin']);
  }

  formulario() {
    this.router.navigate(['formularioAdmin']);
  }
}
