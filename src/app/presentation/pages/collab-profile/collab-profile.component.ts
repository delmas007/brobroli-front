import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { User } from '@interfaces/user';
import { CommonModule } from '@angular/common';
import { Person } from '@interfaces/person';

@Component({
  selector: 'app-collab-profile',
  standalone: true,
  imports: [MatIconModule, CommonModule],
  templateUrl: './collab-profile.component.html',
  styleUrl: './collab-profile.component.css'
})
export class CollabProfileComponent {

  currentUser: Person | null = null;

  ngOnInit(): void {
    this.getCurrentUser();
  }

  getCurrentUser(): void {
    this.currentUser = {
      id: 1,
      slug: 'utilisateur-1',
      firstName: 'Jean',
      lastName: 'Dupont',
      urlProfil: 'http://example.com/profil/jean-dupont',
      email: 'jean.dupont@example.com',
      city: 'Paris',
      tel: '0123456789',
      street: '123 Rue de Paris',
      biographie: 'Développeur passionné avec 10 ans d\'expérience.',
      createAt: new Date('2020-01-01'),
      updateAt: new Date('2021-01-01'),
      balance: [],
      user: []
    };
  }
}
