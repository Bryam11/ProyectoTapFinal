import { Component, OnInit } from '@angular/core';
import { PublicacionControllerService } from '../../Rest/api/publicacionController.service';

@Component({
  selector: 'app-buscar-por-cedula',
  templateUrl: './buscar-por-cedula.component.html',
  styleUrls: ['./buscar-por-cedula.component.css']
})
export class BuscarPorCedulaComponent implements OnInit {

  PublicacionToSearch= "";
  busqueda = false;
  listaPublicaciones= [];
  
  
  
  constructor(private publicacionService: PublicacionControllerService) { }

  ngOnInit(): void {
  }
  buscarPublicacionService(){
    this.publicacionService.listarPublicacionesbyTipoUsingGET(this.PublicacionToSearch).subscribe(data=>{
      this.listaPublicaciones=data;
      this.busqueda = true;
      console.log(this.listaPublicaciones);
      
    })
  }
  

}
