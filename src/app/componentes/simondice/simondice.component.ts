import { Component } from '@angular/core';

@Component({
  selector: 'app-simondice',
  standalone: true,
  imports: [],
  templateUrl: './simondice.component.html',
  styleUrl: './simondice.component.css'
})
export class SimondiceComponent {

  public frase : string[] = ["Simon dice arriba", "Simon arriba", "Simon dice abajo", "Simon abajo", "Simon dice izquiera", "Simon izquierda", "Simon dice derecha", "Simon derecha", "Simon dice salta", "Simon salta"]; 
  public intentos : number = 0;
  public posibilidades : string[] = ["arriba", "abajo", "izquierda", "derecha", "salta"]; 
  public botonClickeado : {[posibilidad: string]: boolean} = {};
  public simonDice : string = this.frase[Math.floor(Math.random() * this.frase.length)];


  constructor(){}

  
}
