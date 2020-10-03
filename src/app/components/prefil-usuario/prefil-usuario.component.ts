import { Component, OnInit } from '@angular/core';
import { PersonaControllerService } from 'app/Rest';

@Component({
  selector: 'app-prefil-usuario',
  templateUrl: './prefil-usuario.component.html',
  styleUrls: ['./prefil-usuario.component.css']
})
export class PrefilUsuarioComponent implements OnInit {
  ListaPersonas: any = [];

  constructor(private personaServicio: PersonaControllerService) { 

  }

  ngOnInit(): void {
 
  }

 

}
