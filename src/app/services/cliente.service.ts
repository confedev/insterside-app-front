import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  url = 'http://localhost:8080/cliente';

  constructor( private http: HttpClient) { }



  getClientes(): any {
    return this.http.get(this.url)
      .pipe(
        map( (resp: any[]) =>
            resp.map( cliente => ({id: cliente.id, nombre: cliente.nombre, apellido: cliente.apellido, cuenta: cliente.cuenta})
          )
        )
       );
  }

  getCliente( id: number ): any {
    return this.http.get(`${ this.url }/${ id }`);

  }

  deleteCliente( id: number ): Observable<string>{
    return this.http.delete(`${ this.url }/${ id }`, {responseType: 'text'});
  }

  actualizarCliente( cliente: any ): Observable<string>{
    if (cliente.id){
      return this.http.put(`${ this.url }`, cliente, {responseType: 'text'});
    }else{
      return this.http.post(`${ this.url }`, cliente, {responseType: 'text'});
    }
  }
}
