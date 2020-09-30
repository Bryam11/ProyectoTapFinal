import { Component, OnInit } from '@angular/core';
import { Persona } from '../../Rest/model/persona';
import { PersonaControllerService } from '../../Rest/api/personaController.service';
import { Router } from '@angular/router';
import { Publicaciones } from 'app/Rest';

@Component({
  selector: 'app-ingreso-persona',
  templateUrl: './ingreso-persona.component.html',
  styleUrls: ['./ingreso-persona.component.css']
})
export class IngresoPersonaComponent implements OnInit {

  persona: Persona = {
    apellido: '',
    edad: '',
    email: '',
    foto: '',
    id: 0,
    nombre: '',
    pais: '',
    publicaciones: null
  };

  publi:Publicaciones = {
    codigo: '',
    descripcion: '',
    fecha: '',
    ide: '',
    lenguajeProgra: ''
  }
  alerts: Alert[];

  showMensaje = false;
  PaisSeleccionado = '';

  listaofPaises = ['Seleccione...',
    'Argentina',
    'Bolivia',
    'Brasil',
    'Chile',
    'Colombia',
    'Ecuador',
    'Guyana',
    'Guyana Francesa',
    'Paraguay',
    'Perú',
    'Suriname',
    'Uruguay',
    'Venezuela'];

  constructor(private personaServicio: PersonaControllerService, private router: Router) {
    this.persona.usuario = [{}];
  }


  ngOnInit(): void {
  }


  ConutryChangeListener() {
    // tslint:disable-next-line: triple-equals
    if (this.PaisSeleccionado != null && this.PaisSeleccionado != 'Seleccione...') {
      this.showMensaje = true;
    } else {
      this.showMensaje = false;
    }
  }

  validaciondeLogueo() {

    this.personaServicio.comprobarLogueoUsingGET(this.persona.usuario[0].contrasenia, this.persona.usuario[0].usuario).subscribe(data => {
      alert(`usuarios correctos Bienvenido ${data.usuario[0].usuario} al Blog`)

      // Cambiamos de componentes
      this.cambiardeVentana();
    }, (err) => {
        alert('Verifique su usuario y contraseña')
    })

  }

  cambiardeVentana() {
    this.router.navigate(['ingreso/Publicaciones']);
  }

  insertPersona() {

    this.personaServicio.findMaxIdPersonaUsingGET().subscribe(data => {

      // autoincrementar el id
      if (data == null) {
        this.persona.id = 1;
      } else {
        this.persona.id = data + 1;
      }

      // Guardamos la persona
      this.personaServicio.guardarPersonaUsingPOST(this.persona).subscribe(data => {
        console.log(data);
        alert('Se ha registrado correctamente')
      }, (err) => {
        alert('los nommbres estan repetidos')
      })
    })

  }
}
