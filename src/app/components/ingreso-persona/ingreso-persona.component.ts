import { Component, OnInit } from '@angular/core';
import { Persona } from '../../Rest/model/persona';
import { PersonaControllerService } from '../../Rest/api/personaController.service';
import { Router } from '@angular/router';
import { Publicaciones } from 'app/Rest';

@Component({
  selector: 'app-ingreso-persona',
  templateUrl: './ingreso-persona.component.html',
  styleUrls: ['./ingreso-persona.component.css']
})
export class IngresoPersonaComponent implements OnInit {
  
  persona: Persona = {
    apellido: '',
    edad: '',
    email: '',
    foto: '',
    id: 0,
    nombre: '',
    pais: '',
    publicaciones:[]
  };

  message: string;

  publi: Publicaciones = {
    codigo: '',
    descripcion: '',
    fecha: '',
    ide: '',
    lenguajeProgra: ''
  }
  

  showMensaje = false;

  PaisSeleccionado = '';

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

  constructor(private personaServicio: PersonaControllerService, private router: Router) {
    this.persona.usuario = [{}];
  }


  ngOnInit(): void {
  }


  CountryChangeListener() {
    // tslint:disable-next-line: triple-equals
    if (this.PaisSeleccionado != null && this.PaisSeleccionado != 'Seleccione...') {
      this.showMensaje = true;
    } else {
      this.showMensaje = false;
    }
  }

  validaciondeLogueo() {

    this.PaisSeleccionado = this.persona.pais;

    this.personaServicio.comprobarLogueoUsingGET(this.persona.usuario[0].contrasenia, this.persona.usuario[0].usuario).subscribe(data => {
      

      localStorage.setItem('user', this.persona.usuario[0].usuario)
      this.message = 'Login Sucesfull';

      // Cambiamos de componentes
      this.cambiardeVentana();

    }, (err) => {
      this.mostrarToastFail();
    })

  }

  cambiardeVentana() {
    this.router.navigate(['ingreso/Publicaciones']);
  }

  insertPersona() {

    this.personaServicio.findMaxIdPersonaUsingGET().subscribe(data => {

      // autoincrementar el id
      if (data == null) {
        this.persona.id = 1;
      } else {
        this.persona.id = data + 1;
      }

      // Guardamos la persona
      this.personaServicio.guardarPersonaUsingPOST(this.persona).subscribe(data => {
        console.log(data);
        this.mostrarToast();
      }, (err) => {
        this.mostrarToastRepeat();
      })
    })

  }
 
  mostrarToast() {
    var toast = document.getElementById("mitoast");
    toast.className = "mostrar";
    setTimeout(function(){ toast.className = toast.className.replace("mostrar", ""); }, 5000);
}


mostrarToastFail() {
  var toast = document.getElementById("mitoastfail");
  toast.className = "mostrar";
  setTimeout(function(){ toast.className = toast.className.replace("mostrar", ""); }, 5000);
}

mostrarToastRepeat() {
  var toast = document.getElementById("mitoastrepeat");
  toast.className = "mostrar";
  setTimeout(function(){ toast.className = toast.className.replace("mostrar", ""); }, 5000);
}
 
// Con esta función se cierra el Toast 
cerrarToast() {
    var toast = document.getElementById("mitoast");
    toast.className = "cerrar";
    toast.className = toast.className.replace("cerrar", "");
}

}
