import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pregunta } from '../models/pregunta';

@Injectable({
  providedIn: 'root'
})
export class PreguntadosService {

  constructor(private httpCliente: HttpClient) { }

  obtenerPregunta(): Observable<Pregunta> {
      return this.httpCliente.get('https://opentdb.com/api.php?amount=1') as Observable<Pregunta>;
  }

  obtenerImagenes(query: string): Observable<any> {
      const headers = new HttpHeaders({
          'Content-Type': 'application/json; charset=utf-8',
          'Authorization': 'xp1YW6hTOQkK8MqDbuuuANAbZTOlEENnKiUFlksLx7Px5if4wdBZO62V'
      });
      const requestOptions = { headers: headers };
      return this.httpCliente.get(`https://api.pexels.com/v1/search?query=${query}&per_page=1`, requestOptions) as Observable<any>;
  }
}
