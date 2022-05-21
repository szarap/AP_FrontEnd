import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PersonaService } from 'src/app/servicios/persona.service';
import { RouterModule, Router } from '@angular/router';
import { LoginService } from 'src/app/servicios/login.service';



@Component({
  selector: 'app-formedicion',
  templateUrl: './formedicion.component.html',
})
export class FormedicionComponent implements OnInit {

  ulogged:String=""; 


  constructor(private personaService:PersonaService,  
              private routes: Router, 
              private LoginService:LoginService) { }


    ngOnInit(): void {
      this.ulogged=this.LoginService.getUserLogged(); 
      
    }
    
  }



