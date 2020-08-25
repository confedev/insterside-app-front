import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CuentaService {

  url = 'http://localhost:8080/cuenta';

  constructor( private http: HttpClient) { }



  getcuentas(): any {
    return this.http.get(this.url)
      .pipe(
        map( (resp: any[]) =>
            resp.map( cuenta => ({id: cuenta.id, nombre: cuenta.nombre, apellido: cuenta.apellido, cuenta: cuenta.cuenta})
          )
        )
       );
  }

  getcuenta( id: number ): any {
    return this.http.get(`${ this.url }/${ id }`);

  }

  deletecuenta( id: number ): Observable<string>{
    return this.http.delete(`${ this.url }/${ id }`, {responseType: 'text'});
  }

  actualizarcuenta( cuenta: any ): Observable<string>{
    if (cuenta.id){
      return this.http.put(`${ this.url }`, cuenta, {responseType: 'text'});
    }else{
      return this.http.post(`${ this.url }`, cuenta, {responseType: 'text'});
    }
  }
}
