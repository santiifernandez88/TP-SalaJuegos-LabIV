import { Component, OnDestroy, OnInit } from '@angular/core';
import { Pregunta } from '../../models/pregunta';
import { PreguntadosService } from '../../servicios/preguntados.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-preguntados',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './preguntados.component.html',
  styleUrl: './preguntados.component.css'
})
export class PreguntadosComponent implements OnInit, OnDestroy{
  public contadorCorrectas: number = 0;
  public estado: boolean | undefined;
  public segundos: number = 0;
  public interval!: any;
  public opciones: string[] = [];
  public categoria: string | undefined;
  public pregunta: string | undefined;
  public preguntaElegida!: Pregunta;
  public img: string | undefined;
  public mensaje! : boolean | undefined;

  constructor(private ps: PreguntadosService) { }

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
    this.estado = true;
    this.elegirAleatoria();
    this.contadorCorrectas = 0;
    this.segundos = 30;
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

  siguiente(): void {
    this.estado = true;
    this.segundos = 30;
    this.elegirAleatoria();
  }

  comprobar(opcion: string): void {
    this.estado = false;
    if (opcion == this.preguntaElegida.results[0].correct_answer) {
      this.contadorCorrectas++;
      if (this.contadorCorrectas == 50) {
        this.mensaje = true
      }
      else {
        setTimeout(() =>{
          this.siguiente();
        },2000)
      }
    } else {
      this.contadorCorrectas = 0;
      this.mensaje = false;
    }
  }

  elegirAleatoria() {
    this.ps.obtenerPregunta().subscribe(pregunta => {
      this.preguntaElegida = pregunta;
      console.log(pregunta);
      this.categoria = this.preguntaElegida.results[0].category;
      this.pregunta = this.fixTexto(this.preguntaElegida.results[0].question);
      this.opciones = this.preguntaElegida.results[0].incorrect_answers;
      this.opciones.push(this.preguntaElegida.results[0].correct_answer);
      this.preguntaElegida.results[0].correct_answer = this.fixTexto(this.preguntaElegida.results[0].correct_answer)
      for (let i = 0; i < this.opciones.length; i++) {
        this.opciones[i] = this.fixTexto(this.opciones[i]);
      }
      this.shuffleArray(this.opciones);
      console.log(this.preguntaElegida.results[0].correct_answer);
      let img = this.ps.obtenerImagenes(this.pregunta);
      img.subscribe(e => { console.log(e); this.img = e['photos'][0]['src']['landscape']; });
    });
  }

  shuffleArray(array: any) {
    array.sort(() => { return Math.random() - 0.5; });
  }

  reiniciar(){
    this.mensaje = undefined;
    setTimeout(() =>{
      this.iniciar()
    },2000)
  }

  fixTexto(texto: string): string {
    texto = texto.replace(/&#039;/g, "'")
      .replace(/&quot;/g, '"')
      .replace(/&deg;/g, '°')
      .replace(/&gt;/g, '>')
      .replace(/&lt;/g, '<')
      .replace(/&apos;/g, "'")
      .replace(/&amp;/g, '&')
      .replace(/&quot;/g, '"')
      .replace(/&nbsp;/g, ' ')
      .replace(/&rdquo;/g, '"')
      .replace(/&ldquo;/g, '"')
      .replace(/&ntilde;/g, 'ñ')
      .replace(/&Ntilde;/g, 'Ñ')
      .replace(/&aacute;/g, 'á')
      .replace(/&eacute;/g, 'é')
      .replace(/&iacute;/g, 'í')
      .replace(/&oacute;/g, 'ó')
      .replace(/&uacute;/g, 'ú')
      .replace(/&ntilde;/g, 'ñ')
      .replace(/&Aacute;/g, 'Á')
      .replace(/&Eacute;/g, 'É')
      .replace(/&Iacute;/g, 'Í')
      .replace(/&Oacute;/g, 'Ó')
      .replace(/&Uacute;/g, 'Ú')
      .replace(/&auml;/g, 'ä')
      .replace(/&euml;/g, 'ë')
      .replace(/&iuml;/g, 'ï')
      .replace(/&ouml;/g, 'ö')
      .replace(/&uuml;/g, 'ü')
      .replace(/&Auml;/g, 'Ä')
      .replace(/&Euml;/g, 'Ë')
      .replace(/&Iuml;/g, 'Ï')
      .replace(/&Ouml;/g, 'Ö')
      .replace(/&Uuml;/g, 'Ü')
    return texto;
  }
}
