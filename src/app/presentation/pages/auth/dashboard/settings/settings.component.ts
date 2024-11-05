import { Component, OnInit } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Person } from '@interfaces/person';
import { User } from '@interfaces/user';
import { Balance } from '@interfaces/balance';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [MatSlideToggleModule, MatIconModule, RouterModule, CommonModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent implements OnInit {

  balance: number = 0;
  currentUser: Person | null = null;
  users: User[] = [];
  isProvider: boolean = false;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.getCurrentUser();
    this.getBalance();
    this.getUsers();
    this.checkIfProvider();
    this.route.fragment.subscribe(fragment => {
      if (fragment) {
        const element = document.querySelector('#' + fragment);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  getCurrentUser(): void {
    this.currentUser = new Person(
      1, 'utilisateur2', 'Delmas', 'Angaman', 'media/images/profile-delmas.png', 'delmas@gmail.com',
      'Abidjan', '0123456789', 'Bingerville', 'Développeur Fullstack',
      new Date(), new Date(),
      [new Balance(2, 'slug', 247000)],
      [{ id: 2, slug: 'utilisateur2', username: 'delmas', password: 'delmas', role: [{id: 1, name: 'provider'}] }]
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
}
