import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { LoginService } from 'src/app/servicios/login.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { PersonaService } from 'src/app/servicios/persona.service';


@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})

export class BannerComponent implements OnInit {

  ulogged:String=""; 
  rutaapi= "/api/persona";
  databanner: any=""; 

  constructor(private Http:HttpClient, private LoginService:LoginService, private routes:Router, private persona:PersonaService) { 
    Http.get(this.rutaapi + "/ver").subscribe(data=>{
      //console.log(data);
      this.databanner=data;
    }) 

  }    
  
  ngOnInit(): void {
    this.ulogged=this.LoginService.getUserLogged();

}




}

