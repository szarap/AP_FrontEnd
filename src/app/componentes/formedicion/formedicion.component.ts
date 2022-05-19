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

  /* message!: string;
  editMessage!: string; */

  constructor(private personaService:PersonaService,  
              private routes: Router, 
              private LoginService:LoginService) { }


    ngOnInit(): void {
      //this.personaService.customMessage.subscribe(msg => this.message = msg);
      this.ulogged=this.LoginService.getUserLogged(); 
    }

    /* changeMessage() {
      this.personaService.changeMessage(this.editMessage);
    } */


  }





