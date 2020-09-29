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
import { PublicacionControllerService } from './Rest/api/publicacionController.service';
import { HttpClientModule } from '@angular/common/http';
import { FooterComponent } from './components/footer/footer.component';
import { BodyComponent } from './components/body/body.component';

import { IngresoPersonaComponent } from './components/ingreso-persona/ingreso-persona.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { CommonModule } from '@angular/common';
import { NouisliderModule } from 'ng2-nouislider';
import { JwBootstrapSwitchNg2Module } from 'jw-bootstrap-switch-ng2';
import { IngresoPublicacioComponent } from './components/ingreso-publicacio/ingreso-publicacio.component';
import { BlogComponent } from './components/blog/blog.component';

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        FooterComponent,
        BodyComponent,
    
        IngresoPersonaComponent,
        IngresoPublicacioComponent,
        NavigationComponent,
        BlogComponent
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
        JwBootstrapSwitchNg2Module
    ],
    providers: [PersonaControllerService,PublicacionControllerService],
    bootstrap: [AppComponent]
})
export class AppModule { }
