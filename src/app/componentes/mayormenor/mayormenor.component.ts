import { Component } from '@angular/core';
import { Cartas } from '../../models/cartas';
import { CardsService } from '../../servicios/cards.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-mayormenor',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './mayormenor.component.html',
  styleUrl: './mayormenor.component.css'
})
export class MayormenorComponent {

  public existeNuevaCarta : boolean = false;
  public nombreDeMazo!: string;
  public ultimaCarta! : Cartas;
  public nuevaCarta! : Cartas;
  public puntaje : number = 0;
  public mensaje! : boolean;

  constructor(private cartasService : CardsService) {
    this.cartasService.crearMazo();
    this.ultimaCarta = new Cartas('', '');
    this.nuevaCarta = new Cartas('', '');
  }

  ngOnInit(): void {
    this.cartasService.ultimaCarta.subscribe( respuesta => {
      this.ultimaCarta = new Cartas( (respuesta as any).value, (respuesta as any).image )
    });
    this.cartasService.nuevaCarta.subscribe( respuesta => {
      this.nuevaCarta = new Cartas( (respuesta as any).value, (respuesta as any).image )
    });
  }

  sacarNuevaCarta(parametro: string){
    this.nombreDeMazo = this.cartasService.nombreMazo;
    this.existeNuevaCarta = true;
    this.validarTamaño(this.ultimaCarta, this.nuevaCarta, parametro)
  }

  validarTamaño(carta1 : Cartas, carta2: Cartas, parametro: string){
    let comparacion: string = "igual";
    if(parseInt(carta2.valor) > parseInt(carta1.valor)){
      comparacion = "mayor"
    }else if(parseInt(carta2.valor) < parseInt(carta1.valor)){
      comparacion = "menor"
    }
    if(parametro == comparacion){
      setTimeout(() =>{
        this.puntaje++;
        this.existeNuevaCarta = false;
        this.ultimaCarta = this.nuevaCarta;
        this.cartasService.obtenerCarta(this.nombreDeMazo)
      },1000)
      if(this.puntaje == 10){
        this.mensaje = true;
      }
    }else{
      setTimeout(() =>{
        this.puntaje = 0;
        this.existeNuevaCarta = false;
        this.cartasService.crearMazo();
      },2000)
    }
  }
  reiniciar() {
    this.puntaje = 0;
    this.existeNuevaCarta = false;
    this.cartasService.crearMazo();
  }
  
}

