import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/servicios/login.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';                                                                        
import { Router } from '@angular/router';
import { PersonaService } from 'src/app/servicios/persona.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-seccion-info',
  templateUrl: './seccion-info.component.html',
  styleUrls: ['./seccion-info.component.css']
})
export class SeccionInfoComponent implements OnInit {
  
  ulogged:String="";
  listeducaciones: any[]=[];
  accion= '';
  educations: FormGroup;
  id:number | undefined;
  tipoeducaciones:any= []=[];


  constructor(private Http:HttpClient, 
    private LoginService:LoginService,  
    private routes:Router,
    private toastr: ToastrService,
    private _PersonaService: PersonaService,
    private edu: FormBuilder)  { 

    
    this.educations = this.edu.group({
      nombre:['', Validators.required],
      fechaInicio:['', Validators.required],
      fechaFin:['', Validators.required],
      tipoEducacion:['', Validators.required],
    })

  }

    ngOnInit(): void {
    this.ulogged=this.LoginService.getUserLogged();    
    this.obtenerEducaciones();
    this.gettipoEducacion();
    
  }

  obtenerEducaciones(){
    this._PersonaService.getListEducacion().subscribe(data =>{
      console.log(data)
      this.listeducaciones = data;
    })
  }

  guardarEducaciones(){

    const educacion: any = {
    nombre: this.educations.get('nombre')?.value,
    fechaInicio: this.educations.get('fechaInicio')?.value,
    fechaFin: this.educations.get('fechaFin')?.value,
    tipoEducacion: this.educations.get('tipoEducacion')?.value,
  } 
  if(this.id == undefined){
    //agregar educacion

    this._PersonaService.saveEducacion(educacion).subscribe(data =>{
      this.toastr.success('La Educacion fue registrada con exito! ', 'Educacion Registrada');
      this.obtenerEducaciones();
      this.educations.reset();
    })

  }else{
    educacion.id = this.id;
    //editar educacion

    this._PersonaService.updateEducacion(this.id, educacion).subscribe(data =>{
      this.educations.reset();
      this.accion="agregar"; 
      this.id=undefined;
      this.obtenerEducaciones();
      this.toastr.info('La Educacion fue actualizada con exito', 'Educacion Actualizada');
      })
    }
  }
  
  
  eliminarEducacion(id:number){
    this._PersonaService.deleteEducacion(id).subscribe(data =>{
      this.toastr.error('La Educacion fue eliminada con exito', 'Educacion elimminada')
      this.obtenerEducaciones();    
    })
  }

  editarEducacion(educacion: any){
    this.accion='editar';
    this.id=educacion.id;

      this.educations.patchValue({
      nombre: educacion.nombre,
      fechaInicio: educacion.fechaInicio,
      fechaFin: educacion.fechaFin,    
      tipoEducacion: educacion.tipoEducacion.nombretedu,
    }) 
  }

  gettipoEducacion(){
    this._PersonaService.gettipoEducacion().subscribe(data =>{
      this.tipoeducaciones=data;
      console.log(this.tipoeducaciones)
    })
  }




}
