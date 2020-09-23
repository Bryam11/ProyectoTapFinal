import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { ComponentsComponent } from './components/components.component';

import { LoginComponent } from './examples/login/login.component';
import { ProfileComponent } from './examples/profile/profile.component';
import { IngresoPublicacioComponent } from './components/ingreso-publicacio/ingreso-publicacio.component';
import { BuscarPorCedulaComponent } from './components/buscar-por-cedula/buscar-por-cedula.component';
import { IngresoPersonaComponent } from './components/ingreso-persona/ingreso-persona.component';

const routes: Routes = [
    { path: '', redirectTo: 'index', pathMatch: 'full' },
    { path: 'index', component: ComponentsComponent },
    { path: 'examples/login', component: LoginComponent },
    { path: 'examples/profile', component: ProfileComponent },
    { path: 'ingreso/Publicaciones', component: IngresoPublicacioComponent },
    { path: 'buscar/Publicaciones/cedula', component: BuscarPorCedulaComponent },
    { path: 'ingreso/Persona', component: IngresoPersonaComponent }
];

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        RouterModule.forRoot(routes)
    ],
    exports: [
    ],
})
export class AppRoutingModule { }
