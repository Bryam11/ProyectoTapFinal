import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';



import { LoginComponent } from './examples/login/login.component';
import { ProfileComponent } from './examples/profile/profile.component';
import { IngresoPublicacioComponent } from './components/ingreso-publicacio/ingreso-publicacio.component';
import { BuscarPorCedulaComponent } from './components/buscar-por-cedula/buscar-por-cedula.component';
import { IngresoPersonaComponent } from './components/ingreso-persona/ingreso-persona.component';
import { BodyComponent } from './components/body/body.component';

const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: BodyComponent },
    { path: 'examples/login', component: LoginComponent },
    { path: 'examples/profile', component: ProfileComponent },
    { path: 'ingreso/Publicaciones', component: IngresoPublicacioComponent },
    { path: 'buscar/Publicaciones/cedula', component: BuscarPorCedulaComponent },
    { path: 'ingreso/Persona', component: IngresoPersonaComponent }
];


export const APPROUTING = RouterModule.forRoot(routes);
