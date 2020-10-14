import { Component, OnInit } from '@angular/core';
import { Persona } from '../../Rest/model/persona';
import { PersonaControllerService } from '../../Rest/api/personaController.service';
import { Router } from '@angular/router';
import { Publicaciones } from 'app/Rest';
import * as AWS from 'aws-sdk';

@Component({
  selector: 'app-ingreso-persona',
  templateUrl: './ingreso-persona.component.html',
  styleUrls: ['./ingreso-persona.component.css']
})
export class IngresoPersonaComponent implements OnInit {

  //VARIABLES PARA METODO SUBIR FOTO
  error = false;
  subiendo = false;
  archivo: any;
  urlImagen = null;
  showImagen = false;

  persona: Persona = {
    apellido: '',
    edad: '',
    email: '',
    foto: '',
    id: 0,
    nombre: '',
    pais: '',
    publicaciones: []
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

  // Instacia del S3 Bucket 
  albumBucketName = 'eteblog';
  s3 = new AWS.S3({
    apiVersion: '2006-03-01',
    params: { Bucket: 'eteblog' },
  });

  constructor(private personaServicio: PersonaControllerService, private router: Router) {
    this.persona.usuario = [{}];
    AWS.config.region = 'us-east-1'; // Región
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
      IdentityPoolId: 'us-east-1:3084bad0-56af-41ce-b304-25579aed16ec',
    });
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

  validaciondeLogueo(nombre: string) {

    this.PaisSeleccionado = this.persona.pais;

    this.personaServicio.comprobarLogueoUsingGET(this.persona.usuario[0].contrasenia, this.persona.usuario[0].usuario).subscribe(data => {
      this.persona = data
      localStorage.setItem('photo', this.persona.foto)
      localStorage.setItem('user', this.persona.usuario[0].usuario)
      this.router.navigate(['Perfildeusuario', nombre, 'usuario']);
      console.log(this.persona.foto)
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


      this.persona.pais = this.PaisSeleccionado;
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
    // tslint:disable-next-line: prefer-const
    var toast = document.getElementById('mitoast');
    toast.className = 'mostrar';
    setTimeout(function () { toast.className = toast.className.replace('mostrar', ''); }, 5000);
  }


  mostrarToastFail() {
    var toast = document.getElementById('mitoastfail');
    toast.className = 'mostrar';
    setTimeout(function () { toast.className = toast.className.replace('mostrar', ''); }, 5000);
  }

  mostrarToastRepeat() {
    var toast = document.getElementById('mitoastrepeat');
    toast.className = 'mostrar';
    setTimeout(function () { toast.className = toast.className.replace('mostrar', ''); }, 5000);
  }

  // Con esta función se cierra el Toast 
  cerrarToast() {
    var toast = document.getElementById('mitoast');
    toast.className = 'cerrar';
    toast.className = toast.className.replace('cerrar', '');
  }

  //Metodo para guardar la foto en el Bucket
  onClickSubir = async (event) => {
    event.preventDefault();
    if (this.archivo) {
      try {
        console.log(this.archivo);
        this.subiendo = true;
        const data = await new AWS.S3.ManagedUpload({
          params: {
            Bucket: this.albumBucketName,
            Key: this.archivo.name,
            Body: this.archivo,
            ACL: 'public-read',
          },
        }).promise();
        this.persona.foto = data.Location;
        this.subiendo = false;
        this.showImagen = true;
        this.insertPersona();
      } catch (error) {
        this.error = true;
        const bucle = setInterval(() => {
          this.error = false;
          clearInterval(bucle);
        }, 2000);
      }
    } else {
      alert('SELECCIONE UN ARCHIVO');
    }
  };
  //Metdo para cargar foto
  onChange = (event) => {
    if (event.target.files.length > 0) {
      this.archivo = event.target.files[0];
      console.log(this.archivo)
    }
  }


}
