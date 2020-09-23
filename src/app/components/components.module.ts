import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { NouisliderModule } from 'ng2-nouislider';
import { JwBootstrapSwitchNg2Module } from 'jw-bootstrap-switch-ng2';
import { RouterModule } from '@angular/router';


import { NavigationComponent } from './navigation/navigation.component';


import { ComponentsComponent } from './components.component';
import { NotificationComponent } from './notification/notification.component';

import { IngresoPublicacioComponent } from './ingreso-publicacio/ingreso-publicacio.component';
import { BuscarPorCedulaComponent } from './buscar-por-cedula/buscar-por-cedula.component';
import { IngresoPersonaComponent } from './ingreso-persona/ingreso-persona.component';
import { HeaderComponent } from './header/header.component';
import { BodyComponent } from './body/body.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgbModule,
        NouisliderModule,
        RouterModule,
        JwBootstrapSwitchNg2Module
    ],
    declarations: [
        ComponentsComponent,
        NavigationComponent,
        NotificationComponent,
        IngresoPublicacioComponent,
        BuscarPorCedulaComponent,
        IngresoPersonaComponent,
        HeaderComponent,
        BodyComponent,
        FooterComponent
    ],
    exports: [ComponentsComponent]
})
export class ComponentsModule { }
