import { Component, OnInit } from '@angular/core';
import { PersonaControllerService } from 'app/Rest';
import { ActivatedRoute, Router } from '@angular/router';
import { Persona } from '../../Rest/model/persona';

@Component({
  selector: 'app-prefil-usuario',
  templateUrl: './prefil-usuario.component.html',
  styleUrls: ['./prefil-usuario.component.css']
})
export class PrefilUsuarioComponent implements OnInit {

  // lista para cargar los Paises
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

  // lista Para cargar los datos en los labels
  ListaPersonas: any = [];

  // Instancia de objeto para cargar en los inputs y editar
  persona: Persona = {};

  // Variable para validar la visibilidad de los inputs y labels
  mostrar: any;


  constructor(private personaServicio: PersonaControllerService, private routes: ActivatedRoute, private router: Router) {

    this.persona.usuario = [{}]; // inicializamos el objeto de usuario

  }

  ngOnInit(): void {

    // Metodo para ver los datos especificos de un usuario
    this.routes.paramMap.subscribe(params => {
      if (params.has('nombre')) {

        // tslint:disable-next-line: max-line-length
        this.personaServicio.verusuarioUsingGET(params.get('nombre')).subscribe(data => {
          this.ListaPersonas = data;
          if (localStorage.getItem('user') != params.get('nombre')) {
            this.mostrar = true;
          } else {
            this.mostrar = false
          }
        })
      } else {
        window.alert('no se ha encontrado ningun registro');
      }

    })

    this.cargarUsuario();
  }
  
  navegarpublicaion() {
    this.router.navigate(['/publicaciones'])
  }

  // metodo para consultar el usuario y cargar en los inputs
  cargarUsuario() {
    this.persona.usuario[0].usuario = localStorage.getItem('user')
    console.log(this.persona.usuario[0].usuario, 'este nombre va entrar en el metodo');

    this.personaServicio.cargarUsuarioUsingGET(this.persona.usuario[0].usuario).subscribe(data => {
      this.persona = data;
    })
  }

  EditarUsuario(){
    this.persona.usuario[0].usuario = localStorage.getItem('user')
    // tslint:disable-next-line: max-line-length
    this.personaServicio.editarUsuarioUsingPUT(this.persona.apellido,this.persona.edad,this.persona.email,this.persona.foto,this.persona.nombre,this.persona.pais,this.persona.usuario[0].usuario).subscribe(data=>{
          alert('se ha actualizado correctamente')
    })
  }
}
