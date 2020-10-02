import { Component, OnInit } from '@angular/core';
import { PersonaControllerService } from 'app/Rest';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  page = 1;

  keyword = 'codigo';
  data = [
     {
       id: 1,
       name: 'Usa'
     },
     {
       id: 2,
       name: 'England'
     }
  ];

  ListaPersonas = [];
  objPubli: [{}];
  

  constructor(private personaServicio: PersonaControllerService) { }

  ngOnInit(): void {
    this.listarpublicaciones();
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
