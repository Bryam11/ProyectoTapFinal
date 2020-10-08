import { Component, OnInit, Input } from '@angular/core';
import { PersonaControllerService, LenguajeControllerService, Persona, Lenguajes } from 'app/Rest';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  page = 1;

  mostrar= false;
  @Input() persona: any = {}
  @Input() indice: number;

  listaLenguajes = [];

  personas: Persona={};
  lenguaje:Lenguajes={};
  ListaPersonas = [];
  objPubli: [{}];

  searchCodigo = '';
  usuarios = '';
  LenguajeSeleccionado='';


  constructor(private personaServicio: PersonaControllerService, private listarlenguaje: LenguajeControllerService, private router: Router) {
    this.personas.publicaciones = [{}];
   }

  ngOnInit(): void {
    this.listarpublicaciones();
    this.Listarlenjuages();
  }



  VerUsuario( nombre: string) {
   this.router.navigate(['Perfildeusuario',nombre,'usuario']);
  }


  copiarAlPortapapeles(id_elemento) {
    var aux = document.createElement("input");
    aux.setAttribute("value", document.getElementById(id_elemento).innerHTML);
    document.body.appendChild(aux);
    aux.select();
    document.execCommand("copy");
    document.body.removeChild(aux);
  }

  listarpublicaciones() {
    this.personaServicio.listarPersonasUsingGET().subscribe(data => {
      this.ListaPersonas = data;
    })
  }
  buscarByCodigo(){
    this.personaServicio.likeByCodigoUsingGET(this.searchCodigo).subscribe(data => {
      this.ListaPersonas = data;
    })
  }

  buscarByDescripcion(){
    this.personaServicio.likeByDescripcionUsingGET(this.searchCodigo).subscribe(data => {
      this.ListaPersonas = data;
    })
  }

  Listarlenjuages() {
    this.listarlenguaje.listarlenguajesUsingGET().subscribe(data => {
      // tslint:disable-next-line: no-unused-expression
      this.listaLenguajes = data;
    })
  }

  buscarByLenguaje(){
    console.log(this.LenguajeSeleccionado)
    this.personaServicio.listarPersonasbylenguajeUsingGET(this.LenguajeSeleccionado).subscribe(data => {
      this.ListaPersonas = data;
    })
  }

}
