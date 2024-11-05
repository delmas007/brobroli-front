import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Person } from '@interfaces/person';
import { User } from '@interfaces/user';

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
  userRole: 'provider' | 'customer' = 'provider';

  questions: {
    provider: Array<{ question: string, type: string, options?: string[] }>[],
    customer: Array<{ question: string, type: string, options?: string[] }>[]
  } = {
    provider: [
      [
        { question: 'Votre Nom', type: 'text' },
        { question: 'Votre Prénom', type: 'text' },
        { question: 'Numéro de téléphone', type: 'text' },
      ],
      [
        { question: 'Ville de résidence ?', type: 'text' },
        { question: 'Quartier de résidence ?', type: 'text' },
        { question: 'Code postal ?', type: 'text' },
        { question: 'Parlez-nous de vous', type: 'textarea' },
      ],
      [
        { question: 'Quelle est votre profession ?', type: 'text' },
        { question: 'Comment avez-vous entendu parler de nous ?', type: 'select', options: ['Internet', 'Ami', 'Publicité', 'Autre'] },
        { question: 'Quels services proposez-vous ?', type: 'select', options: ['Développement mobile', 'Développement web', 'Design graphique', 'Formation', 'Marketing', 'Photographie'] },
      ]
    ],
    customer: [
      [
        { question: 'Votre Nom', type: 'text' },
        { question: 'Votre Prénom', type: 'text' },
        { question: 'Numéro de téléphone', type: 'text' },
      ],
      [
        { question: 'Ville de résidence ?', type: 'text' },
        { question: 'Quartier de résidence ?', type: 'text' },
        { question: 'Code postal ?', type: 'text' },
      ],
      [
        { question: 'Quelle est votre tranche d\'âge ?', type: 'select', options: ['18-25', '26-35', '36-50', '51+'] },
        { question: 'Quels services recherchez-vous ?', type: 'checkbox', options: ['Service 1', 'Service 2', 'Service 3'] },
        { question: 'Comment avez-vous entendu parler de nous ?', type: 'select', options: ['Internet', 'Ami', 'Publicité', 'Autre'] },
      ]
    ]
  };

  answers: any = {};

  ngOnInit() {
    this.questions[this.userRole][this.currentStep - 1].forEach(q => {
      if (q.type === 'checkbox' && q.options) {
        this.answers[q.question] = q.options.map(() => false);
      } else {
        this.answers[q.question] = '';
      }
    });
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

  onSubmit() {
    console.log('Réponses soumises :', this.answers);
    window.location.href = this.userRole === 'provider' ? '/dashboard-prestataire' : '/dashboard-client';
  }
}
