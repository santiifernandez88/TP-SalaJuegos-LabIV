import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-simondice',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './simondice.component.html',
  styleUrl: './simondice.component.css'
})
export class SimondiceComponent implements OnInit, OnDestroy{

  public interval : any;
  public estado! : boolean
  public segundos : number = 0; 
  public puntaje : number = 0;
  public posibilidades : string[] = ["arriba", "abajo", "izquierda", "derecha", "salta"]; 
  public simonDice : string = "";
  public mensaje : boolean | undefined = undefined;

  constructor(){}

  ngOnInit(): void {
    this.interval = setInterval(() => this.tick(), 1000);
    this.iniciar();
    
  }

  ngOnDestroy(): void {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  iniciar() {
    this.mensaje = undefined;
    this.estado = true;
    this.segundos = 3;
    this.simonDice = this.posibilidades[Math.floor(Math.random() * this.posibilidades.length)]
  }
  
  private tick(): void {
    if (this.estado) {
      if (this.segundos == 0) {
        this.estado = false;
        this.mensaje = false;
      } else {
        --this.segundos
      }
    }
  }

  comprobar(parametro : string){

    if(this.simonDice == parametro){
      if(this.puntaje <= 4)
        {
          console.log("sigo jugando")
          this.puntaje++;
          this.iniciar()
        }
        else
        {
          console.log("gane");
          this.mensaje = true;
          this.segundos = 0;
          this.puntaje = 0;
          clearInterval(this.interval);
        }
    }else{
      this.puntaje = 0;
      this.segundos = 0;
      this.mensaje = false;
    }
    
  }

  

}
