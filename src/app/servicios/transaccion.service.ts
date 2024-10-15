import { Transaccion, TransaccionResponse } from './../modelos/transaccion';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransaccionService {

  private BASE_URL = 'http://localhost:8080/api'
  constructor(private http:HttpClient) { }

  get_transacciones():Observable<any>{
    return this.http.get(`${this.BASE_URL}/obtenerTransacciones`)
  }

  crearTransaccion(transaccion: Transaccion): Observable<TransaccionResponse> {
    return this.http.post<any>(`${this.BASE_URL}/crearTransaccion`, transaccion)
  }


}
