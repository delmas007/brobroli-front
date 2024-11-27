import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterOutlet, RouterLink, RouterLinkActive, Router} from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { Person } from '@interfaces/person';
import { User } from '@interfaces/user';
import { Balance } from '@interfaces/balance';
import {FormBuilder} from "@angular/forms";
import {BrobroliService} from "@services/brobroli.service";
import {StateService} from "@services/state.service";
import {Services} from "@interfaces/Services";
import {Collaboration} from "@interfaces/Collaboration";

@Component({
  selector: 'app-projects-provider',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, MatSlideToggleModule, MatIconModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsProviderComponent implements OnInit {
  balance: number = 0;
  currentUser: Person | null = null;
  users: User[] = [];
  isProvider: boolean = false;
  menuOpen = false;
  menuProjectOpen = false;
  projects: any[] = [];
  selectedProjectId: number | null = null;
  collaborations :Collaboration[] = [];
  collaboration: Collaboration = {
    firstNameCutomer: '',
    serviceDescription: '',
    crationDateCollaboration:   '',
    status: '',
    idCollaboration: 0,
    statusProvider: '',
    statusCustomer: '',
  }
  pendingCollaborations: Collaboration[] = [];
  otherCollaborations: Collaboration[] = [];

  constructor(private router: Router,private fb:FormBuilder,private service: BrobroliService,private state:StateService) {}


  ngOnInit() {
    this.getCollaborationProvider();
    this.getCurrentUser();
    this.getBalance();
    this.getUsers();
    this.checkIfProvider();
    this.getProjects();
  }
  getCollaborationProvider(): void {
    this.service.getCollaborationProvider(this.state.authState.id).subscribe(
      data => {
        this.pendingCollaborations = [];
        this.otherCollaborations = [];
        data.forEach((item: any) => {
          const newCollaboration: Collaboration = {
            firstNameCutomer: item.customer?.firstName || 'N/A',
            serviceDescription: item.service?.description || 'N/A',
            crationDateCollaboration: item.createAt || 'N/A',
            status: item.status || 'N/A',
            idCollaboration: item.id || 0,
            statusProvider: item.providerStatusService || 'N/A',
            statusCustomer: item.customerStatusService || 'N/A',
          };

          if (newCollaboration.status === 'EN_ATTENTE') {
            this.pendingCollaborations.push(newCollaboration);
          } else {
            this.otherCollaborations.push(newCollaboration);
          }
        });
      },
      error => {
        console.log(error);
      }
    );
  }
  getCollaborationStatusLabel(status: string): string {
    switch (status) {
      case 'ACCEPTE':
        return 'En cours';
      case 'TERMINE':
        return 'Terminé';
      case 'REFUSE':
        return 'Refusé';
      case 'ANNULER':
        return 'Annulé';
      default:
        return 'Statut inconnu';
    }
  }

  getCurrentUser(): void {
    this.currentUser = new Person(
      1, 'utilisateur2', 'Delmas', 'Angaman', 'media/images/profile-delmas.png', 'delmas@gmail.com',
      'Abidjan', '0123456789', 'Bingerville', 'Développeur Fullstack',
      new Date(), new Date(),
      [new Balance(2, 'slug', 247000)],
      [{ id: 2, slug: 'utilisateur2', username: 'delmas', password: 'delmas', role: [{id: 1, name: 'customer'}] }]
    );
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

  checkIfProvider(): void {
    if (this.currentUser && this.currentUser.user.length > 0) {
      this.isProvider = this.currentUser.user[0].role.some(role => role.name === 'provider');
    }
  }

  onAccept(id:number): void {
    this.service.accepterCollaboration(id).subscribe(
      data => {
        this.getCollaborationProvider();
      },
      error => {
        console.log(error);
      }
    );
  }

  onRefuse(id:number): void {
    this.service.refuserCollaboration(id).subscribe(
      data => {
        this.getCollaborationProvider();
      },
      error => {
        console.log(error);
      }
    );
  }

  onDoneCollab(): void {
    console.log('vous avez validé la fin de la collaboration le prestataire a été notifié');
  }

  onUnDoneCollab(): void {
    console.log('vous n\'avez pas validé la fin de la collaboration le prestataire a été notifié');
  }

  onShowMenu(id: number): void {
    this.menuProjectOpen = !this.menuProjectOpen;
    this.selectedProjectId = this.menuProjectOpen ? id : null;
  }

  onDownloadInvoice(id: number): void {
    console.log(`Téléchargement de la facture pour le projet ${id}`);
  }

  onDeleteProject(id: number): void {
    console.log(`Suppression du projet ${id}`);
  }

  getProjects(): void {
    this.projects = [
      { id: 1, freelancer: 'Delon', task: 'Conception site web', date: '15/05/2023', status: 'En cours' },
      { id: 2, freelancer: 'Delmas', task: 'Maintenance serveur', date: '18/05/2023', status: 'Terminé' },
      { id: 3, freelancer: 'Delmas', task: 'Développement application', date: '20/05/2023', status: 'Terminé' },
      { id: 4, freelancer: 'Soum', task: 'Développement application', date: '20/05/2023', status: 'Terminé' }
    ];
  }

  onCompleteProject(idCollaboration: number) {
    this.service.terminerCollaboration(idCollaboration).subscribe(
      data => {
        console.log(data);
        this.getCollaborationProvider();
      },
      error => {
        console.log(error);
      }
    );
  }
  deconnexion() {
    localStorage.removeItem('token');
    this.state.setAuthState({
      id : undefined,
      isAuthenticated : false,
      username : undefined,
      role : undefined,
      token: undefined,
      mail: undefined
    });
    this.router.navigate(['/login']);

  }

}
