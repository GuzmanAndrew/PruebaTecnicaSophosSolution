import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { CommonModule } from '@angular/common';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import {FormsModule} from "@angular/forms";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(),
    importProvidersFrom(FormsModule, CommonModule)
  ]
};

