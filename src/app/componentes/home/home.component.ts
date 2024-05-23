import { Component } from '@angular/core';
import { LoginComponent } from "../login/login.component";
import { Auth, signOut } from '@angular/fire/auth';
import { Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from '../../servicios/auth.service';
import { ChatComponent } from '../chat/chat.component';

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [LoginComponent, RouterModule, RouterOutlet, ChatComponent]
})
export class HomeComponent {

  constructor(public auth : AuthService, private router : Router){}

  CloseSession(){
    this.auth.logout();
    this.router.navigateByUrl("login");
  }

  NavegarJuegos(game : string){
    if(this.auth.getUser() != null){
      this.router.navigateByUrl(game);
    }else{
      this.router.navigateByUrl("login")
    }
  }

}
