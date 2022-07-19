//import { PorfolioService } from 'src/app/servicios/porfolio.service';
import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { LoginService } from 'src/app/servicios/login.service';
import { PersonaService } from 'src/app/servicios/persona.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
 
  ulogged:String="";
  rutaapi= "https://porfolio-ap-pablo.herokuapp.com/api/persona/";
  databanner: any="";


  constructor(private LoginService:LoginService, 
              private Http:HttpClient, 
              private routes:Router,
              private _personaService:PersonaService) {

    Http.get(this.rutaapi+"ver").subscribe(data=>{
      //console.log(data);
      this.databanner=data;
    })

  }

  ngOnInit(): void {
    this.ulogged=this.LoginService.getUserLogged();
    
  }

  salir(): void{
    this.LoginService.deleteToken();
    this.ulogged="";
    window.location.reload();
  }   





}
