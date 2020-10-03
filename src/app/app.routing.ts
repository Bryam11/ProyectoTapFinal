import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';



import { LoginComponent } from './examples/login/login.component';
import { ProfileComponent } from './examples/profile/profile.component';
import { IngresoPublicacioComponent } from './components/ingreso-publicacio/ingreso-publicacio.component';
import { IngresoPersonaComponent } from './components/ingreso-persona/ingreso-persona.component';
import { BodyComponent } from './components/body/body.component';
import { BlogComponent } from './components/blog/blog.component';
import { PrefilUsuarioComponent } from './components/prefil-usuario/prefil-usuario.component';

const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: BodyComponent },
    { path: 'examples/login', component: LoginComponent },
    { path: 'examples/profile', component: ProfileComponent },
    { path: 'ingreso/Publicaciones', component: IngresoPublicacioComponent },
    { path: 'ingreso/Persona', component: IngresoPersonaComponent },
    { path: 'Blog', component: BlogComponent},
    { path: 'Perfildeusuario', component: PrefilUsuarioComponent}
];


export const APPROUTING = RouterModule.forRoot(routes);
