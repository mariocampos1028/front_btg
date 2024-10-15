import { Producto } from './../modelos/producto';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private BASE_URL = 'http://127.0.0.1:5000'
  constructor(private http:HttpClient) { }

  get_productos():Observable<any>{
    return this.http.get(`${this.BASE_URL}/get_productos`)
  }

  get_tipo_productos():Observable<any>{
    return this.http.get(`${this.BASE_URL}/list_productos`)
  }

  crear_producto(producto:Producto):Observable<any>{
    return this.http.post(`${this.BASE_URL}/crear_producto`, producto);
  }

  actualizar_producto(producto:Producto,id:string):Observable<any>{
    return this.http.put(`${this.BASE_URL}/actualizar_producto/${id}`,producto);
  }




}
