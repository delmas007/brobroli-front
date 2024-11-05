import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import * as AOS from 'aos';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { User } from '@interfaces/user';
import {Inscription} from "@interfaces/Inscription";
import {BrobroliService} from "@services/brobroli.service";
import {of} from "rxjs";
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, FormsModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  errorMessage: any;
  formRegister!: FormGroup;
  donnee:Inscription = {
    email: "",
    user: {
      userName: "",
      password: "",
    }
  }


  constructor(private router: Router,private fb:FormBuilder,private service: BrobroliService) {
  }

  ngOnInit(): void {
    AOS.init();
    this.formRegister = this.fb.group({
      username: this.fb.control("", [Validators.required]),
      password: this.fb.control("", [Validators.required]),
      email: this.fb.control("", [Validators.required,Validators.email]),
      choix: this.fb.control("", [Validators.required]),
      confirm_password: this.fb.control("", [Validators.required]),
    });
  }

  onRegister() {
    this.donnee.user.userName = this.formRegister.value.username;
    this.donnee.user.password = this.formRegister.value.password;
    this.donnee.email = this.formRegister.value.email;
    this.errorMessage = null;
    if (this.formRegister.invalid) {
      this.errorMessage = "Veuillez corriger les erreurs dans le formulaire.";
      return;
    }
    if (this.formRegister.value.password !== this.formRegister.value.confirm_password) {
      this.errorMessage = "Les mots de passe ne correspondent pas.";
      return;
    }
    if (this.formRegister.value.choix === "customer") {
      this.service.inscriptionCustomer(this.donnee).subscribe(
        data => {
          console.log(data);
          this.router.navigate(['/login']);
        },
        error => {
          console.log(error);
          this.errorMessage = error.error.message;
        }
      );
    }
    if (this.formRegister.value.choix === "provider") {
      this.service.inscriptionProvider(this.donnee).subscribe(
        data => {
          console.log(data);
          this.router.navigate(['/login']);
        },
        error => {
          console.log(error);
          this.errorMessage = error.error.message;
        }
      );
    }


  }
}
