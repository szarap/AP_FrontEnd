import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
 export class PorfolioService {

  constructor(private http: HttpClient) { }

   obtenerDatosPersona(url: string):Observable<any>{
    
    return this.http.get(url);
  }
 
}

