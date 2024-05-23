import { Routes } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';
import { HomeComponent } from './componentes/home/home.component';
import { QuienSoyComponent } from './componentes/quien-soy/quien-soy.component';
import { RegistroComponent } from './componentes/registro/registro.component';

export const routes: Routes = [

    { path: '', redirectTo: '/home', pathMatch: "full" },
    { path: 'login',
      loadComponent: () => 
        import('./componentes/login/login.component').then(
            (c) => c.LoginComponent
        ),
      title: 'Login'
    },
    { path: 'home',
      loadComponent: () => 
        import('./componentes/home/home.component').then(
            (c) => c.HomeComponent
        ),
      title: 'Home' 
    },
    { path: 'quiensoy',
      loadComponent: () => 
      import('./componentes/quien-soy/quien-soy.component').then(
          (c) => c.QuienSoyComponent
      ),
      title: 'QuienSoy' 
    },
    { path: 'registro',
      loadComponent: () => 
        import('./componentes/registro/registro.component').then(
          (c) => c.RegistroComponent
        ),
      title: 'Registro' 
    },
    { path: 'ahorcado',
      loadComponent: () => 
        import('./componentes/ahorcado/ahorcado.component').then(
          (c) => c.AhorcadoComponent
        ),
      title: 'Ahorcado' 
    },
    { path: 'mayormenor',
      loadComponent: () => 
        import('./componentes/mayormenor/mayormenor.component').then(
          (c) => c.MayormenorComponent
        ),
      title: 'Mayor o menor' 
    },
    { path: 'preguntados',
      loadComponent: () => 
        import('./componentes/preguntados/preguntados.component').then(
          (c) => c.PreguntadosComponent
        ),
      title: 'Preguntados' 
    },
    { path: 'simondice',
      loadComponent: () => 
        import('./componentes/simondice/simondice.component').then(
          (c) => c.SimondiceComponent
        ),
      title: 'Simon dice' 
    },

];
