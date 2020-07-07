import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  /**
   * Register values
   */
  public register = {
    name: '',
    cpf: '',
    idade: '',
    sexo: '',
    estadocivil: '',
    estado: '',
    dependentes: '',
    renda: ''
  };

  constructor() { }
}
