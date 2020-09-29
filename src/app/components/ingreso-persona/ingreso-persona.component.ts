import { Component, OnInit } from '@angular/core';
import { Persona } from '../../Rest/model/persona';
import { PersonaControllerService } from '../../Rest/api/personaController.service';

@Component({
  selector: 'app-ingreso-persona',
  templateUrl: './ingreso-persona.component.html',
  styleUrls: ['./ingreso-persona.component.css']
})
export class IngresoPersonaComponent implements OnInit {

  persona : Persona = {};

  constructor(private personaServicio:PersonaControllerService) {
    this.persona.usuario=[{}]
   }


  ngOnInit(): void {
  }

  insertPersona(){
    this.personaServicio.guardarPersonaUsingPOST(this.persona).subscribe(data=>{
    console.log(data);
    })
  }
}
