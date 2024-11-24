import { Component } from '@angular/core';
import {CommonModule} from "@angular/common";
import {MatIconModule} from "@angular/material/icon";
import {Person} from "@interfaces/person";

@Component({
  selector: 'app-collab-profile',
  templateUrl: './collab-profile.component.html',
  imports: [MatIconModule, CommonModule],
  standalone: true,
  styleUrls: ['./collab-profile.component.css']
})

export class CollabProfileComponent {
  currentUser: Person | null = null;
  modalImage: string | null = null;

  ngOnInit(): void {
    this.getCurrentUser();
  }

  getCurrentUser(): void {
    this.currentUser = {
      id: 1,
      slug: 'utilisateur-1',
      firstName: 'KARIM',
      lastName: 'FAWAS',
      urlProfil: 'http://example.com/profil/jean-dupont',
      email: 'jean.dupont@example.com',
      city: 'Paris',
      tel: '0123456789',
      street: '123 Rue de Paris',
      biographie: 'Développeur passionné avec 10 ans d\'expérience.',
      photoUrl: 'media/images/profile.png',
      profession: 'Développeur Full Stack',
      certifications: [
        {
          name: 'Certification JAVA SPRING BOOT UDEMY',
          link: 'https://urlz.fr/t8x4',
          description: 'Certification complète JAVA SPRING BOOT sur Udemy.',
          imageUrl: ''
        },
        {
          name: 'Certificat Angular',
          link: '',
          description: 'Certificat Angular délivré par Atos.',
          imageUrl: 'media/images/certificat.jpeg'
        }
      ],
      competences: ['Angular', 'TypeScript', 'Node.js'],
      skillLevels: [
        { name: 'Angular', level: 'Expert' },
        { name: 'JavaScript', level: 'Avancé' },
        { name: 'Node.js', level: 'Intermédiaire' },
      ],
      createAt: new Date('2020-01-01'),
      updateAt: new Date('2021-01-01'),
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
