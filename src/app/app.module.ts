import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // this is needed!
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { APPROUTING } from './app.routing';
import { ExamplesModule } from './examples/examples.module';

import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { PersonaControllerService } from './Rest/api/personaController.service';
import { HttpClientModule } from '@angular/common/http';

import { BodyComponent } from './components/body/body.component';

import { IngresoPersonaComponent } from './components/ingreso-persona/ingreso-persona.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { CommonModule } from '@angular/common';
import { NouisliderModule } from 'ng2-nouislider';
import { JwBootstrapSwitchNg2Module } from 'jw-bootstrap-switch-ng2';
import { IngresoPublicacioComponent } from './components/ingreso-publicacio/ingreso-publicacio.component';
import { BlogComponent } from './components/blog/blog.component';
import { LenguajeControllerService } from './Rest';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { PrefilUsuarioComponent } from './components/prefil-usuario/prefil-usuario.component';
import { FooterComponent } from './components/footer/footer.component';


@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        BodyComponent,
        FooterComponent,
        IngresoPersonaComponent,
        IngresoPublicacioComponent,
        NavigationComponent,
        BlogComponent,
        PrefilUsuarioComponent
    ],
    imports: [
        BrowserAnimationsModule,
        NgbModule,
        FormsModule,
        RouterModule,
        APPROUTING,
        ExamplesModule,
        HttpClientModule,
        CommonModule,
        NouisliderModule,
        JwBootstrapSwitchNg2Module,
        AutocompleteLibModule,

    ],
    providers: [PersonaControllerService, LenguajeControllerService],
    bootstrap: [AppComponent]
})
export class AppModule { }
