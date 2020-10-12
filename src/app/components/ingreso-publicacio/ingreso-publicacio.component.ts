import { Component, OnInit } from '@angular/core';
import { Publicaciones } from '../../Rest/model/publicaciones';
import { PersonaControllerService } from '../../Rest/api/personaController.service';

import { Router } from '@angular/router';
import { Usuario, LenguajeControllerService } from 'app/Rest';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: 'app-ingreso-publicacio',
  templateUrl: './ingreso-publicacio.component.html',
  styleUrls: ['./ingreso-publicacio.component.css']
})
export class IngresoPublicacioComponent implements OnInit {

  showMensaje = false;
  tipoSeleccionada = '';
  listaMensajes = ['Seleccione...', 'Urgente', 'Aviso', 'Chat']
  publicacion: Publicaciones = {};
  usuario: Usuario = {};

  page = 1;

  nombreusuario = localStorage.getItem('user');

  LenguajeSeleccionado: '';

  login = false;
  logout = true;

  closeResult: string;


  listaLenguajes = [];

  // tslint:disable-next-line: max-line-length
  constructor(private personaservice: PersonaControllerService, private router: Router, private lenguajeservice: LenguajeControllerService, private modalService: NgbModal) { }

  ngOnInit(): void {

    this.Listarlenjuages();
    this.usuario.usuario = localStorage.getItem('user');
  }

  lenguajesChangeListener() {
    // tslint:disable-next-line: triple-equals
    if (this.tipoSeleccionada != null && this.tipoSeleccionada != 'Seleccione...') {
      this.showMensaje = true;
    } else {
      this.showMensaje = false;
    }
  }

  Listarlenjuages() {
    this.mostrarToast();
    this.lenguajeservice.listarlenguajesUsingGET().subscribe(data => {
      // tslint:disable-next-line: no-unused-expression
      this.listaLenguajes = data;
    })
  }


  mostrarToast() {
    var toast = document.getElementById('mitoast');
    toast.className = 'mostrar';
    setTimeout(function () { toast.className = toast.className.replace('mostrar', ''); }, 6000);
  }

  mostrarToastPubli() {
    var toast = document.getElementById('mitoastpubli');
    toast.className = 'mostrar';
    setTimeout(function () { toast.className = toast.className.replace('mostrar', ''); }, 6000);
  }



  cerrarToast() {
    var toast = document.getElementById('mitoast');
    toast.className = 'cerrar';
    toast.className = toast.className.replace('cerrar', '');
  }

  guardarPublicacion() {


    this.publicacion.lenguajeProgra = this.LenguajeSeleccionado;
    this.personaservice.anadirPublicacionPersonaUsingPUT(this.publicacion.ide, this.publicacion.codigo, this.publicacion.descripcion, this.publicacion.fecha, this.publicacion.lenguajeProgra, this.publicacion.titulo, this.usuario.usuario).subscribe(data => {
      this.mostrarToastPubli();


    })
  };

  cambiarRuta() {
    this.router.navigate(['ingreso/Persona'])
  }

  open(content, type) {
    if (type === 'sm') {
      console.log('aici');
      this.modalService.open(content, { size: 'sm' }).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    } else {
      this.modalService.open(content).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    }
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
