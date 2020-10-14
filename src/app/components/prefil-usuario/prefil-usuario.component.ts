import { Component, OnInit } from '@angular/core';
import { PersonaControllerService } from 'app/Rest';
import { ActivatedRoute, Router } from '@angular/router';
import { Persona } from '../../Rest/model/persona';
import * as AWS from 'aws-sdk';

@Component({
  selector: 'app-prefil-usuario',
  templateUrl: './prefil-usuario.component.html',
  styleUrls: ['./prefil-usuario.component.css']
})
export class PrefilUsuarioComponent implements OnInit {


  //VARIABLES PARA METODO SUBIR FOTO
  error = false;
  subiendo = false;
  archivo: any;
  urlImagen = null;
  showImagen = false;

  // Instacia del S3 Bucket 
  albumBucketName = 'eteblog';
  s3 = new AWS.S3({
    apiVersion: '2006-03-01',
    params: { Bucket: 'eteblog' },
  });


  // lista para cargar los Paises
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

  // lista Para cargar los datos en los labels
  ListaPersonas: any = [];


  // Instancia de objeto para cargar en los inputs y editar
  persona: Persona = {};

  // Variable para validar la visibilidad de los inputs y labels
  mostrar: any;


  constructor(private personaServicio: PersonaControllerService, private routes: ActivatedRoute, private router: Router) {

    this.persona.usuario = [{}]; // inicializamos el objeto de usuario

    AWS.config.region = 'us-east-1'; // Región
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
      IdentityPoolId: 'us-east-1:3084bad0-56af-41ce-b304-25579aed16ec',
    });

  }

  ngOnInit(): void {

    // Metodo para ver los datos especificos de un usuario
    this.routes.paramMap.subscribe(params => {
      if (params.has('nombre')) {

        // tslint:disable-next-line: max-line-length
        this.personaServicio.verusuarioUsingGET(params.get('nombre')).subscribe(data => {
          this.ListaPersonas = data;
          if (localStorage.getItem('user') != params.get('nombre')) {
            this.mostrar = true;
          } else {
            this.mostrar = false
          }
        })
      } else {
        window.alert('no se ha encontrado ningun registro');
      }

    })

    this.cargarUsuario();
  }

  navegarpublicaion() {
    this.router.navigate(['ingreso/Publicaciones'])
  }

  // metodo para consultar el usuario y cargar en los inputs
  cargarUsuario() {
    this.persona.usuario[0].usuario = localStorage.getItem('user')

    this.personaServicio.cargarUsuarioUsingGET(this.persona.usuario[0].usuario).subscribe(data => {
      this.persona = data;
    })
  }

  EditarUsuario(){
    this.persona.usuario[0].usuario = localStorage.getItem('user')

    // tslint:disable-next-line: no-unused-expression
  
    // tslint:disable-next-line: max-line-length
    this.personaServicio.editarUsuarioUsingPUT(this.persona.apellido, this.persona.edad, this.persona.email, this.persona.foto, this.persona.nombre, this.persona.pais, this.persona.usuario[0].usuario).subscribe(data => {
      this.mostrarToastPubli();

    })
  }

  mostrarToastPubli() {
    var toast = document.getElementById("mitoast");
    toast.className = "mostrar";
    setTimeout(function () { toast.className = toast.className.replace("mostrar", ""); }, 6000);
  }

  cerrarToast() {
    var toast = document.getElementById("mitoast");
    toast.className = "cerrar";
    toast.className = toast.className.replace("cerrar", "");
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
        console.log(this.persona.foto);
        this.subiendo = false;
        this.showImagen = true;
        localStorage.removeItem('photo');
        localStorage.setItem('photo', this.persona.foto)
        this.EditarUsuario();
        location.reload();
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
