import { Component, ViewChild, OnInit, Output, EventEmitter} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IgxNavigationDrawerComponent } from 'igniteui-angular';
import { UserService } from '../services/user/user.service';
import { NavbarService } from '../services/navbar/navbar.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
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
  user: any ={};
  userIdActual: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private NavbarService: NavbarService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    const userIdA = this.NavbarService.getUserId();
    this.userIdActual = userIdA;
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      

      this.findUsuario(this.userIdActual);
    });

  }
  
  findUsuario(id: string) {
    this.userService.findById(atob(this.userIdActual)).subscribe({
      next: (user) => {
        this.user = user;
          
      },
      error: (user) => {
        console.error('Error al obtener usuario:', user);
      },
    });
  }

  salir() {
    this.router.navigate(['iniciar-sesion']);
  }
}
