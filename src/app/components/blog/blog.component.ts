import { Component, OnInit, Input } from '@angular/core';
import { PersonaControllerService, LenguajeControllerService } from 'app/Rest';
import { newArray } from '@angular/compiler/src/util';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  page = 1;

  @Input() persona: any = {}
  @Input() indice: number;

  keyword = 'lenguajes';

  public data$: Observable<any[]>;


  ListaPersonas = [];
  objPubli: [{}];

  usuarios = '';

  // tslint:disable-next-line: max-line-length
  constructor(private personaServicio: PersonaControllerService, private listarlenguaje: LenguajeControllerService, private router: Router) { }

  ngOnInit(): void {
    this.listarpublicaciones();
    this.getData();
  }

  getData(): void {
    this.data$ = this.listarlenguaje.listarlenguajesUsingGET();
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
      for (let ListaP of this.ListaPersonas) {
        console.log(ListaP, "esta lista buenarda");
        for (this.objPubli of ListaP.publicaciones) {
          console.log(this.objPubli, "publicaciones");

        }
      }
      console.log(this.ListaPersonas);

    })
  }

}
