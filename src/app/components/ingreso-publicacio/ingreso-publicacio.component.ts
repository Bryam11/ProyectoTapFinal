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
  //DECLARACION DE VARIABLES
  showMensaje = false;
  tipoSeleccionada = '';
  publicacion: Publicaciones = {};
  usuario: Usuario = {};
  nombreusuario = localStorage.getItem('user');
  LenguajeSeleccionado: '';
  closeResult: string;
  listaLenguajes = [];

  constructor(private personaservice: PersonaControllerService, private router: Router, private lenguajeservice: LenguajeControllerService, private modalService: NgbModal) { }

  ngOnInit(): void {

    this.Listarlenjuages();
    this.usuario.usuario = localStorage.getItem('user');
  }
 

  //METODO PARA LISTAR LENGUAJES DE PROGRAMACION
  Listarlenjuages() {
    this.mostrarToast();
    this.lenguajeservice.listarlenguajesUsingGET().subscribe(data => {
      this.listaLenguajes = data;
    })
  }

  //METODO PARA MOSTRAR MENSAJE TOAST DE BIENVENIDA (BIENVENIDO PARA CREAR PUBLICACION)
  mostrarToast() {
    var toast = document.getElementById('mitoast');
    toast.className = 'mostrar';
    setTimeout(function () { toast.className = toast.className.replace('mostrar', ''); }, 6000);
  }

  //METODO PARA MOSTRAR MENSAJE TOAST DE CONFIRMACION (PUBLICACION CREADA CORRECTAMENTE)
  mostrarToastPubli() {
    var toast = document.getElementById('mitoastpubli');
    toast.className = 'mostrar';
    setTimeout(function () { toast.className = toast.className.replace('mostrar', ''); }, 6000);
  }

  //METODO PARA MOSTRAR MENSJE TOAST DE VALIDACION (LLENAR TODOS LOS CAMPOS)
  mostrarToastVali() {
    var toast = document.getElementById('mitoastvali');
    toast.className = 'mostrar';
    setTimeout(function () { toast.className = toast.className.replace('mostrar', ''); }, 6000);
  }


  //METODO PARA CERRAR EL MENSAJE TOAST
  cerrarToast() {
    var toast = document.getElementById('mitoast');
    toast.className = 'cerrar';
    toast.className = toast.className.replace('cerrar', '');
  }

  //METODO PARA GUARDAR UNA PUBLICACION NUEVA
  guardarPublicacion() {
    if (this.publicacion.ide == undefined || this.publicacion.codigo == undefined || this.publicacion.descripcion == undefined
      || this.publicacion.fecha == undefined || this.LenguajeSeleccionado== undefined || this.publicacion.titulo == undefined
      || this.usuario.usuario == undefined) {
      this.mostrarToastVali();
    } else {
      this.publicacion.lenguajeProgra = this.LenguajeSeleccionado;
      this.personaservice.anadirPublicacionPersonaUsingPUT(this.publicacion.ide, this.publicacion.codigo, this.publicacion.descripcion, this.publicacion.fecha, this.publicacion.lenguajeProgra, this.publicacion.titulo, this.usuario.usuario).subscribe(data => {
        this.mostrarToastPubli();
      })
    }
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
