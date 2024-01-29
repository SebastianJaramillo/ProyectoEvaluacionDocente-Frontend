import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/auth/login.service';
import { LoginRequest } from 'src/app/services/auth/loginRequest';
import { UserService } from 'src/app/services/user/user.service';
import { NavbarService } from 'src/app/services/navbar/navbar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  currentImageIndex = 0;

  carouselImages = [
    '../../../assets/img/1.jpg',
    '../../../assets/img/2.jpg',
    '../../../assets/img/3.jpg',
    '../../../assets/img/4.jpg',
    '../../../assets/img/5.jpg'
  ];
 
  loginError: string = '';
  loginForm = this.formBuilder.group({
    username: ['', [Validators.required]],
    password: ['', Validators.required],
  });
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private loginService: LoginService,
    private userService: UserService,
    private NavbarService: NavbarService
  ) {}

  ngOnInit(): void {
    setInterval(() => {
      this.showNextImage();
    }, 3000);
  }

  showNextImage() {
    this.currentImageIndex = (this.currentImageIndex + 1) % this.carouselImages.length;
  }
  
  get email() {
    return this.loginForm.controls.username;
  }

  get password() {
    return this.loginForm.controls.password;
  }

  login() {
    if (this.loginForm.valid) {
      this.loginError = '';
      this.loginService.login(this.loginForm.value as LoginRequest).subscribe({
        next: (userData) => {
          console.log(userData);
        },
        error: (errorData) => {
          console.error(errorData);
          this.loginError = errorData;
        },
        complete: () => {
          this.userService.getUser(this.loginForm.value.username).subscribe({
            next: (user) => {
              if (user && user.id) {
                this.router.navigate(['periodo', btoa(user.id.toString())]);
                const userId = btoa(user.id.toString());
                this.NavbarService.setUserId(userId);
              } else {
                console.error(
                  'No se encontró un usuario con el nombre proporcionado.'
                );
              }
            },
            error: (user) => {
              console.error(
                'Error obteniendo usuario por nombre:',
                user
              );
            },
          });
          this.loginForm.reset();
        },
      });
    } else {
      this.loginForm.markAllAsTouched();
      alert('Error al ingresar los datos.');
    }
  }
}
