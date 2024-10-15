import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FondoService {

  private BASE_URL = 'http://localhost:8080/api'

  constructor(private http:HttpClient) { }


  get_fondos():Observable<any>{
    return this.http.get(`${this.BASE_URL}/obtenerFondosExistentes`)
  }


}
