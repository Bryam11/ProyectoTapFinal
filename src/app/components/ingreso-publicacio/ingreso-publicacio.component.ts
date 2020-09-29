import { Component, OnInit } from '@angular/core';
import { Publicaciones } from '../../Rest/model/publicaciones';
import { PersonaControllerService } from '../../Rest/api/personaController.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-ingreso-publicacio',
  templateUrl: './ingreso-publicacio.component.html',
  styleUrls: ['./ingreso-publicacio.component.css']
})
export class IngresoPublicacioComponent implements OnInit {

  showMensaje = false;
  tipoSeleccionada = "";
  listaMensajes = ["Seleccione...", "Urgente", "Aviso", "Chat"]
  publicacion: Publicaciones = {};

  page = 1;
  

  personaPublicacionToSearch = "";

  ListaPersonas = [];

  // tslint:disable-next-line: max-line-length
  constructor(private personaservice: PersonaControllerService, private router:Router) { }

  ngOnInit(): void {
    
  }
  shoesChangeListener() {
    if (this.tipoSeleccionada != null && this.tipoSeleccionada != "Seleccione...") {
      this.showMensaje = true;
    } else {
      this.showMensaje = false;
    }
  }
  buscarPersonaByCedulaService() {

    
  }

  guardarPublicacion() {
    
  }

  cambiarRuta(){
    this.router.navigate(['ingreso/Persona'])
  }

}
