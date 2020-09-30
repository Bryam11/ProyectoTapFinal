import { Component, OnInit } from '@angular/core';
import { Publicaciones } from '../../Rest/model/publicaciones';
import { PersonaControllerService } from '../../Rest/api/personaController.service';

import { Router } from '@angular/router';
import { Usuario, LenguajeControllerService } from 'app/Rest';

@Component({
  selector: 'app-ingreso-publicacio',
  templateUrl: './ingreso-publicacio.component.html',
  styleUrls: ['./ingreso-publicacio.component.css']
})
export class IngresoPublicacioComponent implements OnInit {

  showMensaje = false;
  tipoSeleccionada = '';
  listaMensajes = ['Seleccione...', 'Urgente', 'Aviso', 'Chat']
  publicacion: Publicaciones = {};
  usuario: Usuario = {};

  page = 1;


  LenguajeSeleccionado: '';

  login = false;
  logout = true;


  listaLenguajes = [];

  // tslint:disable-next-line: max-line-length
  constructor(private personaservice: PersonaControllerService, private router: Router, private lenguajeservice: LenguajeControllerService) { }

  ngOnInit(): void {
    this.Listarlenjuages();
  }

  lenguajesChangeListener() {
    // tslint:disable-next-line: triple-equals
    if (this.tipoSeleccionada != null && this.tipoSeleccionada != 'Seleccione...') {
      this.showMensaje = true;
    } else {
      this.showMensaje = false;
    }
  }

  Listarlenjuages() {

    this.lenguajeservice.listarlenguajesUsingGET().subscribe(data => {
      // tslint:disable-next-line: no-unused-expression
      this.listaLenguajes = data;
      console.log(this.listaLenguajes);


    })
  }

  buscarPersonaByCedulaService() {


  }

  guardarPublicacion() {
    this.personaservice.anadirPublicacionPersonaUsingPUT(this.publicacion.ide, this.publicacion.codigo, this.publicacion.descripcion, this.publicacion.fecha, this.publicacion.lenguajeProgra, this.usuario.usuario).subscribe(data => {
      console.log('Se a creado la publicacion correctamente');
      alert('Se a creado la publicacion corrextamente');
    })
  };

  cambiarRuta() {
    this.router.navigate(['ingreso/Persona'])
  }

}
