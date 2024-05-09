import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Firestore, addDoc, collection, collectionData } from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../../models/users';
import { AuthService } from '../../servicios/auth.service';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {
  
  email : string = "";
  password : string = "";
  loggedUser: string = "";
  flagError: boolean = false;
  msjError: string = "";


  constructor(private router : Router, public auth : AuthService){}

  RegistrarUser(){
    this.auth.Register(this.email, this.password).then((res) => {
      if(res.user.email !== null) this.auth.userActive = this.auth.getUser()
      this.goTo("home");
      this.flagError = false;
    }).catch((e) => {
      this.flagError = true;

      switch(e.code) {
        case "auth/invalid-email":
          this.msjError = "Email invalido";
          break;
        case "auth/email-already-in-use":
          this.msjError = "Email ya en uso";
          break;
        case "auth/weak-password":
          this.msjError = "La contraseña debe ser de mas de 6 caracteres";
          break;
        case "auth/missing-password":
          this.msjError = "Por favor introduzca una contraseña";
          break;
        default:
          this.msjError = e.code
          break;
      }
    });
  }


  goTo(path : string)
  {
    this.router.navigate([path]);
  }


}
