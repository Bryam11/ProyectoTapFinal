export * from './basicErrorController.service';
import { BasicErrorControllerService } from './basicErrorController.service';
export * from './personaController.service';
import { PersonaControllerService } from './personaController.service';
export * from './publicacionController.service';
import { PublicacionControllerService } from './publicacionController.service';
export const APIS = [BasicErrorControllerService, PersonaControllerService, PublicacionControllerService];
