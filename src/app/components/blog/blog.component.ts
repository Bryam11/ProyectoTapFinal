import { Component, OnInit, Input } from '@angular/core';
import { PersonaControllerService, LenguajeControllerService, Persona, Lenguajes } from 'app/Rest';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {


  //  Array para poder consumir los datos de los lenguajes de programaciom
  //  utilizados
  listaLenguajes = [];

  // <------------------------------------>

  // instanaciamos de la clase interface 
  // para inicializar la estructura de los datos
  personas: Persona = {};

  // Array para almacenar los datos y mostrar
  ListaPersonas = [];

  // Variable para buscar por codigo
  searchCodigo = '';

  // variable para buscar por lenguaje de programacion
  LenguajeSeleccionado = '';


  constructor(private personaServicio: PersonaControllerService, private listarlenguaje: LenguajeControllerService, private router: Router) {
    this.personas.publicaciones = [{}]; // <--Inicializamos publicaciones
  }

  ngOnInit(): void {
    this.listarpublicaciones(); // <--Inicializamos metodo que nos lista las publicaciones
    this.Listarlenjuages(); // <--Inicializamos metodo que nos muestra el combo box de lenguajes
  }


  // metodo para ver una publicacion elegida
  VerUsuario(nombre: string) {
    this.router.navigate(['Perfildeusuario', nombre, 'usuario']);
  }

  // metodo que consuminos para mostrar todas las publicaciones
  listarpublicaciones() {
    this.personaServicio.listarPersonasUsingGET().subscribe(data => {
      this.ListaPersonas = data;
    })
    this.ListaPersonas = [];
  }

  // metodo para buscar por codigo y mostrar
  buscarByCodigo() {
    this.personaServicio.likeByCodigoUsingGET(this.searchCodigo).subscribe(data => {
      this.ListaPersonas = data;
    })

    this.ListaPersonas = [];
  }

  // metodo para buscar por descripcion y mostrar
  buscarByDescripcion() {
    this.personaServicio.likeByDescripcionUsingGET(this.searchCodigo).subscribe(data => {
      this.ListaPersonas = data;
    })

    this.ListaPersonas = [];
  }
 
  // traemos todos los lenguajes existentes en la base 
  // para cargar en el combo box
  Listarlenjuages() {
    this.listarlenguaje.listarlenguajesUsingGET().subscribe(data => {
      // tslint:disable-next-line: no-unused-expression
      this.listaLenguajes = data;
    })
  }

  // metodo para mostrar por lenguaje
  buscarByLenguaje() {
    console.log(this.LenguajeSeleccionado)
    this.personaServicio.listarPersonasbylenguajeUsingGET(this.LenguajeSeleccionado).subscribe(data => {
      this.ListaPersonas = data;
    })
    this.ListaPersonas = [];
  }

}
