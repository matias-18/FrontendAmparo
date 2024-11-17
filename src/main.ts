import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideRouter, RouterModule, Routes } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CrearPeticionComponent } from './app/components/Victima/peticion/crear-peticion/crear-peticion.component';
import { ListarPeticionComponent } from './app/components/Victima/peticion/listar-peticion/listar-peticion.component';
import { RefugioComponent } from './app/components/Victima/refugio/refugio.component';
import { PerfilComponent } from './app/components/Victima/perfil/perfil.component';
import { ForoComponent } from './app/components/Victima/foro/foro.component';
import { HomepageComponent } from './app/components/home/homepage/homepage.component';
import { MenuComponent } from './app/components/Victima/menu/menu.component';
import { IniciarSesionComponentPs} from './app/components/Psicologo/iniciar-sesion/iniciar-sesion.component'
import { RegistrarComponentPs} from './app/components/Psicologo/registrar/registrar.component'
import { IniciarSesionComponentAb } from './app/components/Abogado/iniciar-sesion/iniciar-sesion.component';
import { RegistrarComponentAb } from './app/components/Abogado/registrar/registrar.component';
import { VictimaFelizHomeComponent } from './app/components/Victima/victima-home/victima-feliz-home/victima-feliz-home.component';
import { VictimaTristeHomeComponent } from './app/components/Victima/victima-home/victima-triste-home/victima-triste-home.component';
import { VictimaHomeComponent } from './app/components/Victima/victima-home/victima-home/victima-home.component';
import { IniciarSesionComponent} from './app/components/Victima/iniciar-sesion/iniciar-sesion.component'
import { RegistrarComponentVic } from './app/components/Victima/registrar/registrar.component';
import { ProfesionalesComponent } from './app/components/Victima/profesionales/profesionales.component';
import { ForosPsiComponent } from './app/components/Psicologo/foros-psi/foros-psi.component';
import { MenuPsicologoComponent } from './app/components/Psicologo/menu-psicologo/menu-psicologo.component';
import { PeticionesPsiComponent } from './app/components/Psicologo/peticiones-psi/peticiones-psi.component';
import { VictimasPsiComponent } from './app/components/Psicologo/victimas-psi/victimas-psi.component';
import { PerfilPsiComponent } from './app/components/Psicologo/perfil-psi/perfil-psi.component';
import { CrearsesionComponent } from './app/components/Psicologo/sesiones-psi/sesiones/crearsesion/crearsesion.component';
import { HistorialsesionesComponent } from './app/components/Psicologo/sesiones-psi/historialsesiones/historialsesiones.component';
import { PsicologoHomeComponent } from './app/components/Psicologo/psicologo-home/psicologo-home.component';
import { AbogadoHomeComponent } from './app/components/Abogado/abogado-home/abogado-home.component';
import { ForosAbogComponent } from './app/components/Abogado/foros-abog/foros-abog.component';
import { MenuAbogComponent } from './app/components/Abogado/menu-abog/menu-abog.component';
import { PerfilAbogComponent } from './app/components/Abogado/perfil-abog/perfil-abog.component';
import { ListarsesionpsicologoComponent } from './app/components/Psicologo/sesiones-psi/sesiones/listarsesionpsicologo/listarsesionpsicologo.component';
import { PeticionesAbogComponent } from './app/components/Abogado/peticiones-abog/peticiones-abog.component';
import { DetallesesionpsicologoComponent } from './app/components/Psicologo/sesiones-psi/sesiones/detallesesionpsicologo/detallesesionpsicologo.component';
import { VictimasAbogComponent } from './app/components/Abogado/victimas-abog/victimas-abog.component';
import { PsiCasoDescripcionComponent } from './app/components/Psicologo/Casos-Psi/psi-caso-descripcion/psi-caso-descripcion.component';
import { PsiPeticioesCasoComponent } from './app/components/Psicologo/psi-peticioes-caso/psi-peticioes-caso.component';
import { PsiMiscasosComponent } from './app/components/Psicologo/Casos-Psi/psi-miscasos/psi-miscasos.component';
import { AbogCasoDescripcionComponent } from './app/components/Abogado/Casos-Abog/abog-caso-descripcion/abog-caso-descripcion.component';
import { AbogPeticionesCasoComponent } from './app/components/Abogado/abog-peticiones-caso/abog-peticiones-caso.component';
import { AbogMiscasosComponent } from './app/components/Abogado/Casos-Abog/abog-miscasos/abog-miscasos.component';
import { VicDetalleSesionHistorialComponent } from './app/components/Victima/SesionesVictima/vic-historial-pendi/vic-detalle-sesion-historial/vic-detalle-sesion-historial.component';
import { VicHistorialSesionPendiComponent } from './app/components/Victima/SesionesVictima/vic-historial-pendi/vic-historial-sesion-pendi/vic-historial-sesion-pendi.component';
import { VicDetalleSesionPendiComponent } from './app/components/Victima/SesionesVictima/vic-sesiones-pendi/vic-detalle-sesion-pendi/vic-detalle-sesion-pendi.component';
import { VicListarSesionPendiComponent } from './app/components/Victima/SesionesVictima/vic-sesiones-pendi/vic-listar-sesion-pendi/vic-listar-sesion-pendi.component';

import { segGuard } from './app/guard/seguridad.guard';
import { ListarsesionComponent } from './app/components/Abogado/sesiones-abog/sesiones/listarsesion/listarsesion.component';


const routes: Routes = [
  //Victima
  { path: 'CrearPeticion', component:CrearPeticionComponent, canActivate: [segGuard] },
  { path: 'ListarPeticion', component:ListarPeticionComponent , canActivate: [segGuard] },
  { path: 'Refugio', component:RefugioComponent , canActivate: [segGuard]},
  { path: 'Perfil', component:PerfilComponent , canActivate: [segGuard]},
  { path: 'Foro', component:ForoComponent , canActivate: [segGuard]},
  { path: 'menu', component:MenuComponent , canActivate: [segGuard]},
  { path: 'inicioV', component: IniciarSesionComponent},
  {path: 'registroVic', component: RegistrarComponentVic},
  {path: 'victimaFeliz', component: VictimaFelizHomeComponent, canActivate: [segGuard]},
  {path: 'victimaTriste', component: VictimaTristeHomeComponent, canActivate: [segGuard]},
  {path: 'victimaHome', component: VictimaHomeComponent, canActivate: [segGuard]},
  {path: 'profesionales', component: ProfesionalesComponent, canActivate: [segGuard]},
  {path: 'vicdetallesesionhistorial/:id', component: VicDetalleSesionHistorialComponent, canActivate: [segGuard]},
  {path: 'vichistorialsesionpendi', component: VicHistorialSesionPendiComponent, canActivate: [segGuard]},
  {path: 'vicdetallesesionpendi/:id', component: VicDetalleSesionPendiComponent, canActivate: [segGuard]},
  {path: 'viclistarsesionpendi', component: VicListarSesionPendiComponent, canActivate: [segGuard]},

  //Psicologo
  { path: 'inicioPs', component: IniciarSesionComponentPs},
  { path: 'registrarPs', component: RegistrarComponentPs},
  {path: 'ForoPsicologos', component: ForosPsiComponent, canActivate: [segGuard]},
  {path : 'menuPsicologo', component: MenuPsicologoComponent, canActivate: [segGuard]},
  {path : 'peticionesPsi', component: PeticionesPsiComponent, canActivate: [segGuard]},
  {path : 'victimasPsi', component: VictimasPsiComponent, canActivate: [segGuard]},
  {path : 'perfilPsi', component: PerfilPsiComponent, canActivate: [segGuard]},
  {path: 'crearSesionpsi', component: CrearsesionComponent, canActivate: [segGuard]},
  {path : 'historialSesionespsico', component: HistorialsesionesComponent, canActivate: [segGuard]},
  {path: 'psicologoHome', component: PsicologoHomeComponent, canActivate: [segGuard]},
  {path: 'listarSesionPsicologo', component: ListarsesionpsicologoComponent, canActivate: [segGuard]},
  { path: 'detalle-sesion/:id', component: DetallesesionpsicologoComponent , canActivate: [segGuard]},
  {path: 'psiCasoDescripcion/:id', component: PsiCasoDescripcionComponent, canActivate: [segGuard]},
  {path: 'psiPeticionesCaso', component: PsiPeticioesCasoComponent, canActivate: [segGuard]},
  {path: 'psiMisCasoDescripcion/:id', component: PsiMiscasosComponent, canActivate: [segGuard]},

  //Abogado
  { path: 'inicioAb', component: IniciarSesionComponentAb},
  { path: 'registrarAb', component: RegistrarComponentAb},
  {path: 'abogadoHome', component: AbogadoHomeComponent, canActivate: [segGuard]},  
  {path: 'ForoAbogados', component: ForosAbogComponent, canActivate: [segGuard]},
  {path : 'menuAbogado', component: MenuAbogComponent, canActivate: [segGuard]},
  {path : 'perfilAbogado', component: PerfilAbogComponent, canActivate: [segGuard]},
  {path: 'peticionesAbog', component: PeticionesAbogComponent, canActivate: [segGuard]},
  {path: 'victimasAbog', component: VictimasAbogComponent, canActivate: [segGuard]},
  {path: 'abogCasoDescripcion/:id', component: AbogCasoDescripcionComponent, canActivate: [segGuard]},
  {path: 'abogPeticionesCaso', component: AbogPeticionesCasoComponent, canActivate: [segGuard]},
  {path: 'abogMisCasoDescripcion/:id', component: AbogMiscasosComponent, canActivate: [segGuard]},
  {path: 'crearSesionAbog', component: CrearsesionComponent, canActivate: [segGuard]},
  {path: 'historialSesionesabog', component: HistorialsesionesComponent, canActivate: [segGuard]},
  {path: 'listarSesionAbog', component: ListarsesionComponent, canActivate: [segGuard]},
  {path: 'detalle-sesion-abog/:id', component: DetallesesionpsicologoComponent, canActivate: [segGuard]},
  
  
  //Landing
  {path: 'homepage', component: HomepageComponent},

   // Default route
   { path: '', redirectTo: 'homepage', pathMatch: 'full' }

  

];

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes), 
    importProvidersFrom(HttpClientModule, RouterModule, MatToolbarModule, BrowserAnimationsModule), provideAnimationsAsync(), provideAnimationsAsync()]
});