import { Component, OnInit, OnDestroy, Input, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { MatHorizontalStepper } from '@angular/material/stepper';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { isValidCPF, formatCPF } from '@brazilian-utils/brazilian-utils';

import { RegisterService } from '@register/register.service';
import { fade } from '@shared/animations/fade';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  animations: [fade]
})
export class RegisterComponent implements OnInit, OnDestroy {

  /**
   * Stepper
   */
  @ViewChild('stepper', { static: true }) stepper: MatHorizontalStepper;

  /**
   * Form
   */
  @ViewChildren(NgForm) forms: QueryList<any>;

  public isValidCPF;
  public formatCPF;

  /**
   * Current Page
   * 0 -> Loading
   * 1 -> Page Start
   * 2 -> About You
   * 3 -> Your Situation
   * 4 -> Your Income
   * 5 -> Result
   * 6 -> Your Request
   */
  public page = 0;

  /**
   * Text of Banner Nature by Current Page
   */
  public bannerText = '';
  public bannerTexts = {
    0: 'Inclusão financeira<br> digital para você<br> e sua família.',
    1: '',
    2: 'Inclusão financeira<br> digital para você<br> e sua família.',
    3: 'Benefícios, descontos e<br> promoções exclusivas<br> dos programas da Visa.',
    4: 'Controle gastos <br> com o seu cartão<br> por aplicativo.',
    5: 'Transações em tempo<br> real, fácil acesso a<br> gestão de limites.',
    6: 'Transações em tempo<br> real, fácil acesso a<br> gestão de limites.'
  };

  /**
   * Steps
   */
  public stepTitle = '';
  public stepSubtitle = '';
  public stepsTexts = {
    0: ['', ''],
    1: ['', ''],
    2: ['Qual o seu Nome?', 'Digite o seu nome completo para avançar.'],
    3: ['Qual o seu Estado Cívil?', 'Nos ajude a enteder a sua situação.'],
    4: ['Qual a sua Renda?', 'Caso tenha uma renda variável digite a anterior.'],
    5: ['Bem vindo', 'Obrigado por compartilhar suas informações.'],
    6: ['', '']
  };

  /**
   * Select Options
   */
  public optionsIdade = [18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34,
    35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57,
    58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80,
    81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100];
  public optionsSexo = ['Masculino', 'Feminino', 'Outros', 'Prefiro não declarar'];
  public optionsEstadoCivil = ['Solteiro', 'Casado', 'Separado', 'Divorciado', 'Viúvo', 'Amasiado'];
  public optionsEstado = ['Acre', 'Alagoas', 'Amapá', 'Amazonas', 'Bahia', 'Ceará', 'Distrito Federal',
    'Espírito Santo', 'Goiás', 'Maranhão', 'Mato Grosso', 'Mato Grosso do Sul', 'Minas Gerais', 'Pará',
    'Paraíba', 'Paraná', 'Pernambuco', 'Piauí', 'Rio de Janeiro', 'Rio Grande do Norte', 'Rio Grande do Sul',
    'Rondônia', 'Roraima', 'Santa Catarina', 'São Paulo', 'Sergipe', 'Tocantins'];
  public optionsDependentes = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  /**
   * Pages
   */
  public pages = {
    0: 'register/credit-proposal/loading',
    1: 'register/',
    2: 'register/credit-proposal/about-you',
    3: 'register/credit-proposal/your-situation',
    4: 'register/credit-proposal/your-income',
    5: 'register/credit-proposal/result',
  };

  public register: any;

  /**
   * Get page value subscription
   */
  private page$: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private registerService: RegisterService
  ) {
    this.isValidCPF = isValidCPF;
    this.formatCPF = formatCPF;
    this.page$ = this.activatedRoute.data.subscribe(({ page }) => {
      this.page = page;
      this.register = this.registerService.register;
    });
  }

  public ngOnInit(): void {
    const [title, subtitle] = this.stepsTexts[this.page];
    this.bannerText = this.bannerTexts[this.page];
    this.stepTitle = title;
    this.stepSubtitle = subtitle;

    if (this.page === 0) {
      console.log(this.registerService);
      setTimeout(() => {
        this.goTo(5);
      }, 2000);
    }
  }

  public ngOnDestroy(): void {
    this.page$.unsubscribe();
  }

  public goTo(pageNumber: number): void {
    this.router.navigateByUrl(`${this.pages[pageNumber]}`);
  }

  public stepChanged({ selectedIndex }): void {
    this.goTo(selectedIndex + 2);
  }


  /**
   * Validate Document
   * @param value Field value
   */
  public validateDocument(value: string): string {
    if (isValidCPF(value)) {
      value = formatCPF(value);
    }

    return value;
  }

  /**
   * Allow only numbers
   * Remove Special characters e separators
   * @param value Value to be parsed
   * @returns onlyNumbers Only numbers from value
   */
  public AllowOnlyNumbers(value: string): string {
    const onlyNumbers: string = value.toString().replace(/\D/g, '');
    return onlyNumbers;
  }

  public registerCreditProposal(): void {
    this.goTo(0);
  }
}
