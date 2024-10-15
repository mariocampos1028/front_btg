import { Cliente } from './../modelos/cliente';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private BASE_URL = 'http://localhost:8080/api'

  constructor(private http:HttpClient) { }

  get_clientes():Observable<any>{
    return this.http.get(`${this.BASE_URL}/obtenerClientes`)
  }

  crear_cliente(cliente:Cliente):Observable<any>{
    return this.http.post(`${this.BASE_URL}/crearCliente`,cliente)
  }

  eliminar_cliente(cliente:Cliente):Observable<any>{
    return this.http.delete(`${this.BASE_URL}/borrarCliente`,{body: cliente})
  }



}
