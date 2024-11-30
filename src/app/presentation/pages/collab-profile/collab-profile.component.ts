import {Component, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {MatIconModule} from "@angular/material/icon";
import {Person} from "@interfaces/person";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {BrobroliService} from "@services/brobroli.service";

@Component({
  selector: 'app-collab-profile',
  templateUrl: './collab-profile.component.html',
  imports: [MatIconModule, CommonModule, RouterLink],
  standalone: true,
  styleUrls: ['./collab-profile.component.css']
})

export class CollabProfileComponent implements OnInit {
  currentUser: Person | null = null;
  modalImage: string | null = null;
  constructor(private service: BrobroliService,private activatedRoute : ActivatedRoute) {
  }

  ngOnInit(): void {
    const id  = this.activatedRoute.snapshot.params['id']
    this.service.getProviderAuth(id).subscribe({
      next: (response) => {
        this.getCurrentUser(response);
      },
      error: (error) => {
        console.error(error);
      }
    })

  }

  getCurrentUser(data: any) {
    console.log(data);
    this.currentUser = {
      id: data.id,
      slug: 'utilisateur-1',
      firstName: data.firstName,
      lastName: data.lastName,
      urlProfil: data.urlProfil,
      email: data.email,
      city: data.city,
      tel: data.tel,
      street: data.street,
      biographie: data.biographie,
      photoUrl: data.photoUrl,
      profession: 'Développeur Full Stack',
      certifications: [
        {
          name: 'Bien débuter avec Spring et Spring Boot pour Java',
          link: 'https://www.udemy.com/certificate/UC-9c534d7b-e4e3-4811-9233-625438fc6f35/',
          description: 'Bien débuter avec Spring et Spring Boot pour Java',
          imageUrl: ''
        },
        {
          name: 'Git & GitHub Mastery | Valable pour 2021',
          link: 'https://urlz.fr/t8x4',
          description: 'Git & GitHub Mastery | Valable',
          imageUrl: ''
        },
        {
          name: 'Keycloak integration with Spring Boot 3',
          link: 'https://www.udemy.com/certificate/UC-7a884d98-defd-4fa1-b5ac-992e93d38b0b/',
          description: 'Développeur WEB Fullstack avec Spring et React',
          imageUrl: ''
        },
        {
          name: 'Certificat Angular',
          link: '',
          description: 'Certificat Angular délivré par Atos.',
          imageUrl: 'media/images/certif.jpg'
        },
        {
          name: 'Certificat java',
          link: '',
          description: 'Certificat Angular délivré par Atos.',
          imageUrl: 'media/images/images.png'
        }
      ],
      competences: ['Angular', 'TypeScript', 'Node.js'],
      skillLevels: data.skills,
      createAt: data.createAt,
      updateAt: data.updateAt,
      balance: [],
      user: [],
    };
  }

  openModal(cert: any): void {
    this.modalImage = 'media/images/certificat.jpeg';
    const modal = document.getElementById('cert-modal');
    if (modal) modal.style.display = 'flex';
  }

  closeModal(): void {
    const modal = document.getElementById('cert-modal');
    if (modal) modal.style.display = 'none';
    this.modalImage = null;
  }
}
