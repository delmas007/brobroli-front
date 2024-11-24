import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { NavbarComponent } from '@layout/navbar/navbar.component';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import * as AOS from 'aos';
import {Login} from "@interfaces/Login";
import {BrobroliService} from "@services/brobroli.service";
import {StateService} from "@services/state.service";


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NavbarComponent, CommonModule, RouterOutlet, RouterLink, RouterLinkActive, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent implements OnInit {
  errorMessage: any;
  formLogin!: FormGroup;
  loading = false;
  user: Login = {
    userName: '',
    password: '',
    rememberMe: false
  };


  navigateToResetPassword(): void {
    this.router.navigate(['/forgot-password']);
  }


  constructor(private router: Router,private fb:FormBuilder,private service: BrobroliService,private state:StateService) {
  }


  ngOnInit(): void {AOS.init();
    this.formLogin = this.fb.group({
      username: this.fb.control("", [Validators.required, Validators.minLength(3)]),
      password: this.fb.control("", [Validators.required, Validators.minLength(6)]),
      rememberMe: this.fb.control(false)
    });
  }



  onLogin() {
    this.user.userName = this.formLogin.value.username;
    this.user.password = this.formLogin.value.password;
    this.errorMessage = null;
    this.loading = true;
    if (this.formLogin.invalid) {
      this.formLogin.markAllAsTouched();
      this.errorMessage = "Veuillez corriger les erreurs dans le formulaire.";
      //this.loading = false;
      return;
    }
    this.service.login(this.user).subscribe({
      next: (data: any) => {
        localStorage.setItem('token', data.id_token);
        this.state.loadToken();
        const role = this.state.authState.role;
        if (role === 'SCOPE_CUSTOMER') {
          this.router.navigate(['/dashboard-client']);
        } else if (role === 'SCOPE_PROVIDER') {
          this.router.navigate(['/dashboard-prestataire']);
        }else if (role === 'SCOPE_ADMIN') {
          this.router.navigate(['/admin']);
        }
        this.loading = false;
      },
      error: (err: any) => {
        console.log(err);
        this.errorMessage = err.error.message || "Une erreur est survenue.";
        this.loading = false;
      },
    });
}
  }
