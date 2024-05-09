import { Component } from '@angular/core';
import { LoginComponent } from "../login/login.component";
import { Auth, signOut } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AuthService } from '../../servicios/auth.service';

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [LoginComponent]
})
export class HomeComponent {

  constructor(public auth : AuthService, private router : Router){}

  CloseSession(){
    this.auth.logout();
    this.router.navigateByUrl("login");
  }

}
