import { Component, OnInit } from '@angular/core';
import { PersonaControllerService } from 'app/Rest';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-prefil-usuario',
  templateUrl: './prefil-usuario.component.html',
  styleUrls: ['./prefil-usuario.component.css']
})
export class PrefilUsuarioComponent implements OnInit {
  ListaPersonas: any = [];

  constructor(private personaServicio: PersonaControllerService, private routes: ActivatedRoute, private router: Router) {

  }

  ngOnInit(): void {
    this.routes.paramMap.subscribe(params => {
      if (params.has('nombre')) {

        // tslint:disable-next-line: max-line-length
        this.personaServicio.verusuarioUsingGET(params.get('nombre')).subscribe(data => {
         this.ListaPersonas= data;
         console.log(this.ListaPersonas)
        })
      }
      else {
        window.alert('no se ha encontrado ningun registro');
      }

    })
  }
  navegarpublicaion() {
    this.router.navigate(['/publicaciones'])
  }
}