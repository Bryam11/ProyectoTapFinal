import { Component, OnInit } from '@angular/core';
import { PersonaControllerService } from 'app/Rest';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  page = 1;

  ListaPersonas = [];

  constructor(private personaServicio: PersonaControllerService) { }

  ngOnInit(): void {
    this.listarpublicaciones();
  }

  listarpublicaciones() {
    this.personaServicio.listarPersonasUsingGET().subscribe(data => {
      this.ListaPersonas = data;
      console.log(this.ListaPersonas);

    })
  }

}
