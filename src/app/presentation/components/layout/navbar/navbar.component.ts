import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule,  } from '@angular/common';
import {RouterOutlet, RouterLink, RouterLinkActive, Router} from '@angular/router';
import {StateService} from "@services/state.service";


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  isScrolled = false;
  isMenuOpen = false;
  isAuth = false;
  statee : any = {
    id : undefined,
    isAuthenticated : false,
    username : undefined,
    role : undefined,
    token: undefined,
  }

  constructor(private state :StateService,private router: Router) {
  }
  deconnexion() {
    this.state.setAuthState(this.statee);
    localStorage.removeItem('token');
    this.router.navigate(['/login']);

  }

  toggleMenu() {
    const modal = document.querySelector('.menu-modal') as HTMLElement;
    if (this.isMenuOpen) {
      modal.style.animation = 'wipe-out-down 0.5s ease forwards';
      modal.addEventListener('animationend', () => {
        modal.style.display = 'none';
      }, { once: true });
    } else {
      modal.style.display = 'flex';
      modal.style.animation = 'wipe-in-up 0.5s ease forwards';
    }
    this.isMenuOpen = !this.isMenuOpen;
  }

  ngOnInit(): void {
    if (this.state.authState.isAuthenticated) {
      this.isAuth = true;
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    const scrollY = window.scrollY || document.documentElement.scrollTop;

    if (scrollY > 50) {
      this.isScrolled = true;
    } else {
      this.isScrolled = false;
    }
  }

  dashboard() {
   this.router.navigate(['/projects-customer']);
  }
}
