import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {Router, RouterModule} from '@angular/router';
import { Person } from '@interfaces/person';
import { User } from '@interfaces/user';
import {BrobroliService} from "@services/brobroli.service";
import {StateService} from "@services/state.service";

@Component({
  selector: 'app-final-registration',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './final-registration.component.html',
  styleUrl: './final-registration.component.css'
})
export class FinalRegistrationComponent implements OnInit {
  currentStep: number = 1;
  totalSteps: number = 3;
  formdata: FormData = new FormData();
  isModalOpen: boolean = false;
  isModalOpenEchec: boolean = false;
  constructor(private service: BrobroliService,protected state:StateService,private router:Router) {
  }

  questions: {
    SCOPE_PROVIDER: Array<{ question: string, type: string, field: string, options?: string[] }>[],
    SCOPE_CUSTOMER: Array<{ question: string, type: string, field: string, options?: string[] }>[]
  } = {
    SCOPE_PROVIDER: [
      [
        { question: 'Votre Nom', type: 'text', field: 'lastName' },
        { question: 'Votre Prénom', type: 'text', field: 'firstName' },
        { question: 'Numéro de téléphone', type: 'text', field: 'tel' },
      ],
      [
        { question: 'Ville de résidence ?', type: 'text', field: 'city' },
        { question: 'Quartier de résidence ?', type: 'text', field: 'street' },
        { question: 'Photo de profil', type: 'file', field: 'urlProfil' },
      ],
      [
        { question: 'Parlez-nous de vous', type: 'textarea', field: 'biographie' },
      ]
    ],
    SCOPE_CUSTOMER: [
      [
        { question: 'Votre Nom', type: 'text', field: 'lastName' },
        { question: 'Votre Prénom', type: 'text', field: 'firstName' },
        { question: 'Numéro de téléphone', type: 'text', field: 'tel' },
      ],
      [
        { question: 'Ville de résidence ?', type: 'text', field: 'city' },
        { question: 'Quartier de résidence ?', type: 'text', field: 'street' },
        { question: 'Photo de profil', type: 'file', field: 'urlProfil' },
      ],
      [
        { question: 'Parlez-nous de vous', type: 'textarea', field: 'biographie' },
       ]
    ]
  };


  answers: any = {};

  ngOnInit() {
    const role = this.state.authState.role as 'SCOPE_PROVIDER' | 'SCOPE_CUSTOMER';
    this.questions[role][this.currentStep - 1].forEach(q => {
      if (q.type === 'checkbox' && q.options) {
        this.answers[q.question] = q.options.map(() => false);
      } else {
        this.answers[q.question] = '';
      }
    });
    console.log(this.state.authState.role)
  }

  nextStep() {
    if (this.currentStep < this.totalSteps) {
      this.currentStep++;
    }
  }

  previousStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }
  getCurrentQuestions(): { question: string, type: string, field: string, options?: string[] }[] {
    const role = this.state.authState.role as 'SCOPE_PROVIDER' | 'SCOPE_CUSTOMER';
    return this.questions[role][this.currentStep - 1] || [];
  }
  onFileChange(event: Event, field: string): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.answers[field] = file;
    }
  }

  openModal() {
    this.isModalOpen = true;

  }

  closeModal() {
    this.isModalOpen = false;
    if (this.state.authState.role === "SCOPE_PROVIDER") {
      this.router.navigate(['/dashboard-prestataire']);
    }else if (this.state.authState.role === "SCOPE_CUSTOMER") {
      this.router.navigate(['/dashboard-client']);
    }
  }
  openModalEchec() {
    this.isModalOpenEchec = true;
  }

  closeModalEchec() {
    this.isModalOpenEchec = false;
  }
  onSubmit() {
    console.log('Réponses soumises :', this.answers);
    this.formdata.append('fileurlImage', this.answers.urlProfil);
    this.formdata.append('lastName', this.answers.lastName);
    this.formdata.append('firstName', this.answers.firstName);
    this.formdata.append('tel', this.answers.tel);
    this.formdata.append('city', this.answers.city);
    this.formdata.append('street', this.answers.street);
    this.formdata.append('biographie', this.answers.biographie);

    const request =
      this.state.authState.role === "SCOPE_CUSTOMER"
        ? this.service.updateCustomer(this.formdata, this.state.authState.id)
        : this.service.updateProvider(this.formdata, this.state.authState.id);

    request.subscribe({
      next: (data) => {
        console.log('Mise à jour réussie');
        console.log(data);
        this.openModal();
      },
      error: (error) => {
        console.error('Erreur lors de la mise à jour :', error);
      }
    });
    }

}
