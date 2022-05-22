import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PersonaService } from 'src/app/servicios/persona.service';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'src/app/servicios/login.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';


@Component({
  selector: 'app-formedicion',
  templateUrl: './formedicion.component.html',
})
export class FormedicionComponent implements OnInit {

  ulogged:String="";
  proy: FormGroup;
  listdeproyectos: any[]=[];
  id:number | undefined;


  constructor(private _personaService:PersonaService,
              private pro: FormBuilder,  
              private toastr: ToastrService, 
              private LoginService:LoginService,
              private routes: Router) { 
    
      this.proy = this.pro.group({
      nombre:['', Validators.required],
      fechaFin:['', [Validators.required, Validators.maxLength(10), Validators.minLength(10)]],
      fotoproyecto:['', [Validators.required, Validators.maxLength(50), Validators.minLength(5)]],
    })

  }

  ngOnInit(): void {
    this.ulogged=this.LoginService.getUserLogged(); 
    this.getProyectos();
  }

      getProyectos(){
    this._personaService.getProyectos().subscribe(data =>{
      console.log(data);
      this.listdeproyectos = data;
    })
  }
  
  guardarProyecto(){
  console.log(this.proy);

    const proyectos: any = {
    nombre: this.proy.get('nombre')?.value,
    fechaFin: this.proy.get('fechaFin')?.value,
    fotoproyecto: this.proy.get('fotoproyecto')?.value,
    }

    if(this.id == undefined){
      
      //agregar un nuevo proyecto      
        this.proy.reset();
        this._personaService.saveProyecto(proyectos).subscribe(data =>{
        this.toastr.success('El Proyecto fue registrado con exito! ', 'Proyecto Registrado');
        this.getProyectos();
      })

    }else{

      proyectos.id = this.id;
      //editar proyecto

        this._personaService.updateProyecto(this.id, proyectos).subscribe(data =>{
        //this.proy.reset();
        //this.accion='agregar';
        this.id= undefined;
        this.getProyectos();
        this.toastr.info('El Proyecto fue actualizada con exito','Proyecto Actualizado');
        this.proy.reset();
      })
    }

  }

  eliminarProyecto(id: number){
    this._personaService.deleteProyecto(id).subscribe(data =>{
      this.toastr.error('El Proyecto fue eliminado con exito! ', 'Experiencia Elimininada');
      this.getProyectos();
    })
  }

  editarProyecto(proyecto: any){
    //this.accion='editar';
      this.id=proyecto.id;    

      this.proy.patchValue({
      nombre: proyecto.nombre,
      fechaFin: proyecto.fechaFin,
      fotoproyecto: proyecto.fotoproyecto,
    })
  } 





}


