import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterRoutingModule } from '@register/register-routing.module';
import { MaterialModule } from '@libs/material/material.module';
import { BootstrapModule } from '@libs/bootstrap/bootstrap.module';

import { RegisterComponent } from '@register/register.component';

@NgModule({
  declarations: [RegisterComponent],
  imports: [
    CommonModule,
    MaterialModule,
    BootstrapModule,
    RegisterRoutingModule
  ]
})
export class RegisterModule { }
