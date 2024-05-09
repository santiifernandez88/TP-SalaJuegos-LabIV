import { NgClass } from '@angular/common';
import { Component, EventEmitter, NgModule } from '@angular/core';
import { Firestore, addDoc } from '@angular/fire/firestore';
import { FormsModule, ReactiveFormsModule, } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { collection } from 'firebase/firestore';
import { User } from '../../models/users';
import { AuthService } from '../../servicios/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, RouterOutlet, ReactiveFormsModule, NgClass, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  email: string = "";
  password : string = "";
  flagError : boolean = false;
  loggedUser: string = "";
  msjError : string = "";


  constructor(private router: Router, public auth : AuthService, private firestore : Firestore) {}

  LoginUser() {
    this.auth.Login(this.email, this.password).then((res) => {
      if (res.user.email !== null) this.auth.userActive = res.user;
      let col = collection(this.firestore, "logins");
      addDoc(col, {fecha: new Date(), "user": this.email});
      this.goTo("home")
      this.flagError = false;
    }).catch((e) => {

      this.flagError = true;

      switch(e.code) {
        case "auth/invalid-email":
          this.msjError = "Email invalido";
          break;
        case "auth/invalid-credential":
          this.msjError = "El email o contraseña son incorrectos";
          break;
        case "auth/missing-password":
          this.msjError = "Por favor introduzca una contraseña";
          break;
        case "auth/too-many-requests":
          this.msjError = "Por favor ingrese bien sus datos";
          break;
        default:
          this.msjError = e.code
          break;
      }
    });
  }

  Rellenar(){
    this.email = "ejemplo@gmail.com";
    this.password = "ejemplo";
  }


  goTo(path : string)
  {
    this.router.navigate([path]);
  }

  
}
