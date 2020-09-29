import { Component, OnInit } from '@angular/core';
import { Persona } from '../../Rest/model/persona';
import { PersonaControllerService } from '../../Rest/api/personaController.service';

@Component({
  selector: 'app-ingreso-persona',
  templateUrl: './ingreso-persona.component.html',
  styleUrls: ['./ingreso-persona.component.css']
})
export class IngresoPersonaComponent implements OnInit {

  persona: Persona = {};

  showMensaje = false;
  tipoSeleccionada = "";

  listaofPaises = ["Seleccione...",
    "Argentina",
    "Bolivia",
    "Brasil",
    "Chile",
    "Colombia",
    "Ecuador",
    "Guyana",
    "Guyana Francesa",
    "Paraguay",
    "Perú",
    "Suriname",
    "Uruguay",
    "Venezuela"]

  constructor(private personaServicio: PersonaControllerService) {
    this.persona.usuario = [{}]
  }


  ngOnInit(): void {
  }


  ConutryChangeListener() {
    if (this.tipoSeleccionada != null && this.tipoSeleccionada != "Seleccione...") {
      this.showMensaje = true;
    } else {
      this.showMensaje = false;
    }
  }

  insertPersona() {
    this.personaServicio.guardarPersonaUsingPOST(this.persona).subscribe(data => {
      console.log(data);
    })
  }
}
