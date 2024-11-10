import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import * as AOS from 'aos';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { User } from '@interfaces/user';
import {Inscription} from "@interfaces/Inscription";
import {BrobroliService} from "@services/brobroli.service";
import {of} from "rxjs";
import {StateService} from "@services/state.service";
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
  loading = false;
  donnee:Inscription = {
    email: "",
    user: {
      userName: "",
      password: "",
    }
  }


  constructor(private router: Router,private fb:FormBuilder,private service: BrobroliService,private state:StateService) {
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
    this.loading = true;
    this.donnee.user.userName = this.formRegister.value.username;
    this.donnee.user.password = this.formRegister.value.password;
    this.donnee.email = this.formRegister.value.email;
    this.errorMessage = null;
    if (this.formRegister.invalid) {
      this.errorMessage = "Veuillez corriger les erreurs dans le formulaire.";
      this.loading = false;
      return;
    }
    if (this.formRegister.value.password !== this.formRegister.value.confirm_password) {
      this.errorMessage = "Les mots de passe ne correspondent pas.";
      this.loading = false;
      return;
    }
    if (this.formRegister.value.choix === "customer") {
      this.service.inscriptionCustomer(this.donnee).subscribe(
        data => {
          console.log(data);
          localStorage.setItem("email",this.donnee.email)
          this.loading = false;
          this.router.navigate(['/verify-code']);
        },
        error => {
          console.log(error);
          this.errorMessage = error.error.message;
          this.loading = false;
        }
      );
    }
    if (this.formRegister.value.choix === "provider") {
      this.service.inscriptionProvider(this.donnee).subscribe(
        data => {
          console.log(data);
          this.loading = false;
          localStorage.setItem("email",this.donnee.email)
          this.router.navigate(['/verify-code']);
        },
        error => {
          console.log(error);
          this.loading = false;
          this.errorMessage = error.error.message;
        }
      );
    }


  }
}
