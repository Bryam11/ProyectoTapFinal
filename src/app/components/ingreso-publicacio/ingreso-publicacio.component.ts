import { Component, OnInit } from '@angular/core';
import { Publicaciones } from '../../Rest/model/publicaciones';
import { PersonaControllerService } from '../../Rest/api/personaController.service';

import { Router } from '@angular/router';
import { Usuario } from 'app/Rest';

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
  usuario: Usuario = {};

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
    this.personaservice.anadirPublicacionPersonaUsingPUT(this.publicacion.ide,this.publicacion.codigo,this.publicacion.descripcion,this.publicacion.fecha,this.publicacion.lenguajeProgra,this.usuario.usuario).subscribe(data => {
      console.log();
    })
    };
  
  cambiarRuta(){
    this.router.navigate(['ingreso/Persona'])
  }

}
