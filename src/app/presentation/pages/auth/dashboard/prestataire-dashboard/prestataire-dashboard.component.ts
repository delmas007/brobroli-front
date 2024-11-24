import {Component, OnInit} from '@angular/core';
import { CommonModule,  } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { DashSliderCardComponent } from '@shared/dash-slider-card/dash-slider-card.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { Person } from '@interfaces/person';
import { User } from '@interfaces/user';
import { Balance } from '@interfaces/balance';
import {BrobroliService} from "@services/brobroli.service";
import {StateService} from "@services/state.service";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";

@Component({
  selector: 'app-prestataire-dashboard',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, DashSliderCardComponent, MatSlideToggleModule, MatIconModule, ReactiveFormsModule],
  templateUrl: './prestataire-dashboard.component.html',
  styleUrl: './prestataire-dashboard.component.css'
})
export class PrestataireDashboardComponent implements OnInit {
  constructor(private service: BrobroliService, private state: StateService,private fb:FormBuilder) {
  }
  menuOpen = false;
  modalWithdrawOpen = false;
  carrocel = false;
  balance: any ;
  currentUser: Person | null = null;
  users: User[] = [];
  slides: any[] = [];
  sumForm!: FormGroup;
  urlImage!:string;

  ngOnInit(): void {
    this.getProlfil();
    this.getCurrentUser();
    this.getBalance();
    this.getUsers();
    this.initializeSlides();
    this.sumForm = this.fb.group({
      sum: this.fb.control('', [Validators.required])
    });
  }
  getProlfil(): void {
    this.service.getProvider(this.state.authState.id).subscribe(
      data => {
        console.log(data);
        this.balance= data.balance.sum
        this.urlImage = data.urlProfil;
        if (data.firstName !== null) {
          this.carrocel = true;
        }
      },
      error => {
        console.log(error);
      }
    );
  }
  retrait(): void {
    this.service.retrait(this.sumForm.value.sum,this.state.authState.id).subscribe(
      data => {
        console.log(data);
        this.getProlfil();
      },
      error => {
        console.log(error);
      }
    );
  }

  getCurrentUser(): void {
  }

  getBalance(): void {
    if (this.currentUser && this.currentUser.balance.length > 0) {
      this.balance = this.currentUser.balance[0].sum;
    }
  }

  getUsers(): void {
    if (this.currentUser) {
      this.users = this.currentUser.user;
    }
  }

  isProfileComplete(): boolean {
    if (!this.currentUser) return false;
    return Object.values(this.currentUser).every(value =>
      value !== null && value !== undefined && value !== ''
    );
  }
  initializeSlides(): void {
  this.slides = [
    {imageSrc:'media/images/fiche.png', imageAlt:'Freelancer', title:'Inscription incomplète', text: 'Veuillez terminer votre inscription pour débuter une collaboration.', url:'/final-registration', btnText:'Finaliser' },
    {imageSrc:'media/images/freelancer.png', imageAlt:'Freelancer', title: `Bonjour, ${this.currentUser?.firstName || ''}`, text: 'Consultez toutes les collaborations en attente sur votre profil pour débuter un service.', url:'/projects-provider', btnText:'Voir les projets' },
    {imageSrc:'media/images/ajouter-service.png', imageAlt:'Freelancer', title:'Mes services', text: 'Ajouter les services que vous possédez.', url:'/add-service', btnText:'Ajouter un service' }
    ];
  }

  get slidesToShow(): any[] {
    return this.carrocel
      ? this.slides.filter(slide => slide.title !== 'Inscription incomplète')
      : this.slides;
  }
  onPaySubmit(): void {
    console.log('Rechargement du solde');
  }
  onWithdrawSubmit(): void {
    console.log('Retrait du solde');
  }
}
