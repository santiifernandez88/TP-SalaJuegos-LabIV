import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-ahorcado',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './ahorcado.component.html',
  styleUrl: './ahorcado.component.css'
})
export class AhorcadoComponent implements OnInit{
  

  public palabrasJuego : string[] = ['aluminio', 'animales', "bitacora", "ruleta", "gracias", "zapato", "hoja", "toro", "dentrifico", "yerba"];
  public letras : string[] = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','y','z'];
  public intentos : number = 0;
  public palabraOculta : string = "";
  public botonesClickeados: { [letra: string]: boolean } = {};
  public partida : boolean | undefined = undefined;
  public palabra : string = this.palabrasJuego[Math.floor(Math.random() * this.palabrasJuego.length)];

  ngOnInit(): void {
    this.palabraOculta = " _ ".repeat(this.palabra.length);
    console.log(this.palabra);
  }

  comprobar(letra: string) {
    if (!this.botonesClickeados[letra]) {
      this.existeLetra(letra);

      const palabraOcultaArreglo = this.palabraOculta.split("  ");
      for (let i = 0; i <= this.palabra.length; i++) {
        if (this.palabra[i] === letra) {
          palabraOcultaArreglo[i] = letra;
        }
      }
      this.palabraOculta = palabraOcultaArreglo.join("  ");
      this.botonesClickeados[letra] = true;
      this.verificaGanador();
    }
  }

  verificaGanador() {
    const palabraArr = this.palabraOculta.split(" ");
    const palabraEvaluar = palabraArr.join("");

    if (palabraEvaluar === this.palabra) {
      this.partida = true;
     
    }
    else if (this.intentos === 6) {
      this.partida = false;
      
    }
    
  }

  existeLetra(letra: string) {
    if (this.palabra.indexOf(letra) == -1) {
      this.intentos++;
    }
  }

  reiniciar() {
    this.partida = undefined;
    this.intentos = 0;
    this.palabra = this.palabrasJuego[Math.floor(Math.random() * this.palabrasJuego.length)];
    this.palabraOculta = " _ ".repeat(this.palabra.length);
    this.botonesClickeados = {};
    console.log(this.palabra);
  }


}
