import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { LoginService } from './login.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class PersonaService {

  private ApiurlExp="/api/experienciaLaboral/";
  private ApiurlEdu="/api/educacion/";
  private ApiurlTipoTrab="/api/tipoTrabajo/";
  private ApiurlTipoEdu="/api/tipoEducacion/";
  private ApiurlProyecto="/api/proyecto/";

  
  constructor(private http: HttpClient,  
              private cookies:CookieService,
              private LoginService:LoginService) { }

    //METODOS PARA EL CRUD DE LA EXPERIENCIA LABORAL

    getListExperiencias():Observable<any>{
      return this.http.get(this.ApiurlExp+ "ver");
    }

    deleteExperiencia(id: number):Observable<any>{
      return this.http.delete(this.ApiurlExp + "delete/" + id);
    }

    saveExperiencia(experiencia: String): Observable<any>{
      return this.http.post(this.ApiurlExp + "new", experiencia);
    }

    updateExperiencia (id: number, experiencia: any): Observable<any>{
    return this.http.put(this.ApiurlExp + "editar", experiencia);
  }

  //get del tipo de trabajo para relacionar las tablas

    gettipoTrabajo():Observable<any>{
    return this.http.get(this.ApiurlTipoTrab+ "ver");
    }
  

  //METODOS PARA EL CRUD DE EDUCACION

    getListEducacion():Observable<any>{
      return this.http.get(this.ApiurlEdu + "ver");      
    } 

    deleteEducacion(id: number):Observable<any>{
      return this.http.delete(this.ApiurlEdu + "delete/" + id);
    }

    saveEducacion(educacion: String): Observable<any>{
      return this.http.post(this.ApiurlEdu + "new", educacion);
    }

    updateEducacion (id: number, educacion: any): Observable<any>{
      return this.http.put(this.ApiurlEdu + "editar", educacion);
    }

    //metodo para el tipo de educacion
    gettipoEducacion():Observable<any>{
    return this.http.get(this.ApiurlTipoEdu + "ver");
    } 

    //METODOS PARA EL CRUD DE Proyectos 

    getListProyecto():Observable<any>{
      return this.http.get(this.ApiurlProyecto + "ver");      
    } 

    deleteProyecto(id: number):Observable<any>{
      return this.http.delete(this.ApiurlProyecto + "delete/" + id);
    }

    saveProyecto(proyecto: String): Observable<any>{
      return this.http.post(this.ApiurlProyecto + "new", proyecto);
    }

    updateProyecto(id: number, proyecto: any): Observable<any>{
      return this.http.put(this.ApiurlProyecto + "editar", proyecto);
    }

}
  