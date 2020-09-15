import { Component, OnInit } from '@angular/core';
import { Persona } from '../../Rest/model/persona';
import { PersonaControllerService } from '../../Rest/api/personaController.service';

@Component({
  selector: 'app-ingreso-persona',
  templateUrl: './ingreso-persona.component.html',
  styleUrls: ['./ingreso-persona.component.css']
})
export class IngresoPersonaComponent implements OnInit {
 public objectpersona: Persona={
  apellido: "",
  cedula: "",
  edad: 0,
  email: "",
  nombre: ""
 };

  constructor(private personaServicio:PersonaControllerService) { }

  ngOnInit(): void {
  }
  subirPersonasService(){
this.personaServicio.guardarPersonaUsingPOST(this.objectpersona).subscribe(data=>{
alert('se ha ingresado correctamente la persona')
})
  }
}
