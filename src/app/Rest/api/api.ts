export * from './basicErrorController.service';
import { BasicErrorControllerService } from './basicErrorController.service';
export * from './lenguajeController.service';
import { LenguajeControllerService } from './lenguajeController.service';
export * from './personaController.service';
import { PersonaControllerService } from './personaController.service';
export const APIS = [BasicErrorControllerService, LenguajeControllerService, PersonaControllerService];
