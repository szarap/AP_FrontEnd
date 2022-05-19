import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'src/app/servicios/login.service';
import { PersonaService } from 'src/app/servicios/persona.service';


@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {

  ulogged:String="";
  listexperiencias: any[]=[];
  accion= '';
  formulario: FormGroup;
  id:number | undefined;
  tipotrabajo:any= []=[];

  constructor(private LoginService:LoginService, 
              private fb: FormBuilder, 
              private toastr: ToastrService,
              private _personaService:PersonaService) { 
              
    this.formulario = this.fb.group({
      nombreExperiencia:['', Validators.required],
      fechaInicio:['', [Validators.required, Validators.maxLength(10), Validators.minLength(10)]],
      fechaFin:['', [Validators.required, Validators.maxLength(10), Validators.minLength(10)]],
      descripcion:['', [Validators.required, Validators.maxLength(50), Validators.minLength(5)]],
      trabajos:['', [Validators.required,Validators.maxLength(11),Validators.minLength(9)]]
    })
  }

  ngOnInit(): void {
    this.ulogged=this.LoginService.getUserLogged();
    this.obtenerExperiencias();
    this.gettipoTrabajo();
  }

  obtenerExperiencias(){
    this._personaService.getListExperiencias().subscribe(data =>{
      console.log(data);
      this.listexperiencias = data;
    })
  }
  
  guardarExperiencia(){
  //console.log(this.formulario);

    const experiencias: any = {
    nombreExperiencia: this.formulario.get('nombreExperiencia')?.value,
    fechaInicio: this.formulario.get('fechaInicio')?.value,
    fechaFin: this.formulario.get('fechaFin')?.value,
    descripcion: this.formulario.get('descripcion')?.value,
    trabajos: this.formulario.get('trabajos')?.value,
    }

    if(this.id == undefined){
      
      //agrega una nueva experiencia
        this._personaService.saveExperiencia(experiencias).subscribe(data =>{
        this.toastr.success('La Experiencia Laboral fue registrada con exito! ', 'Experiencia Registrada');
        this.obtenerExperiencias();
        this.formulario.reset();
      })

    }else{

      experiencias.id = this.id;
      //editar experiencia

        this._personaService.updateExperiencia(this.id, experiencias).subscribe(data =>{
        this.formulario.reset();
        this.accion='agregar';
        this.id= undefined;
        this.obtenerExperiencias();
        this.toastr.info('La Experiencia fue actualizada con exito','Experiencia Actualizada');
      })
    }

  }

  eliminarExperiencia(id: number){
    this._personaService.deleteExperiencia(id).subscribe(data =>{
      this.toastr.error('La Experiencia Laboral fue eliminada con exito! ', 'Experiencia Elimininada');
      this.obtenerExperiencias();
    })
  }

  editarExperiencia(experiencia: any){
    this.accion='editar';
    this.id=experiencia.id;    

      this.formulario.patchValue({
      nombreExperiencia: experiencia.nombreExperiencia,
      fechaInicio: experiencia.fechaInicio,
      fechaFin: experiencia.fechaFin,
      descripcion: experiencia.descripcion,
      trabajos: experiencia.trabajos.tipotrabajo,
    })
  }

  gettipoTrabajo(){
    this._personaService.gettipoTrabajo().subscribe(data =>{
      this.tipotrabajo=data;
      console.log(this.tipotrabajo)
    })
  }




}
