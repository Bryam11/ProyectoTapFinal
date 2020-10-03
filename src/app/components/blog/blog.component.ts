import { Component, OnInit } from '@angular/core';
import { PersonaControllerService, LenguajeControllerService } from 'app/Rest';
import { newArray } from '@angular/compiler/src/util';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  page = 1;

  keyword = 'lenguajes';

  public data$: Observable<any[]>;

  ListaPersonas = [];
  objPubli: [{}];

  constructor(private personaServicio: PersonaControllerService, private listarlenguaje: LenguajeControllerService) { }

  ngOnInit(): void {
    this.listarpublicaciones();
    this.getData();
  }

  getData(): void {
    this.data$ = this.listarlenguaje.listarlenguajesUsingGET();
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
