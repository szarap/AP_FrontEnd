import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/servicios/login.service';
import { RouterModule, Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: String="";
  constrasenia: any="";
  loginError: String = "";

  constructor(private LoginService:LoginService, private routes: Router) { }
  
  login(){    
   
    const user = {email: this.email, contrasenia: this.constrasenia};

    this.LoginService.login(user).subscribe(data =>{
      //console.log(data);
      if (data == null) this.loginError="Error en Usuario o Contraseña";
      else{
        this.loginError = "";
        this.LoginService.setToken(data.id);
        //this.routes.navigate(['portfolio']);
        window.location.reload();
      }
    })
  }
  
  
  ngOnInit(): void {
  }

}
