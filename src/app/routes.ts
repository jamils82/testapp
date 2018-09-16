import { RouterModule, Routes } from '@angular/router';
import { DoctoraComponent } from './doctora/doctora.component';
import {DoctorbComponent} from './doctorb/doctorb.component';
import {PagenotfoundComponent} from './pagenotfound/pagenotfound.component';

export const appRoutes: Routes = [
    { path: 'doctora',  component: DoctoraComponent },
    { path: 'doctorb', component: DoctorbComponent },
  ];
