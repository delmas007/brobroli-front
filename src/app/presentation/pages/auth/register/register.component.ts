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


  constructor(
    private router: Router,
    private fb: FormBuilder,
    private service: BrobroliService,
    private state: StateService
  ) {}

  ngOnInit(): void {
    AOS.init();
    this.initForm();
  }
  private initForm() {
    this.formRegister = this.fb.group({
      username: ["", [Validators.required]],
      password: ["", [Validators.required, Validators.minLength(6)]],
      confirm_password: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]],
      choix: ["", [Validators.required]],
    }, {
      validators: this.passwordMatchValidator
    });
  }

  private passwordMatchValidator(group: FormGroup): { [key: string]: boolean } | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirm_password')?.value;
    return password === confirmPassword ? null : { notMatching: true };
  }



  onRegister() {
    this.loading = true;
    this.errorMessage = null;

    setTimeout(() => {
      console.log("Enregistrement terminé !");
      this.loading = false;
    }, 2000);


    if (this.formRegister.invalid) {
      this.loading = false;
      this.errorMessage = "Veuillez bien renseigner le formulaire.";
      this.formRegister.markAllAsTouched();
      return;
    }

    const formValues = this.formRegister.value;
    this.donnee.user.userName = formValues.username;
    this.donnee.user.password = formValues.password;
    this.donnee.email = formValues.email;


    const request =
      formValues.choix === "customer"
      ? this.service.inscriptionCustomer(this.donnee)
      : this.service.inscriptionProvider(this.donnee);

    request.subscribe({
      next: (data) => {
        console.log(data);
        localStorage.setItem("email", this.donnee.email);
        this.loading = false;
        this.router.navigate(['/verify-code']);
      },
      error: (error) => {
        console.error(error);
        this.errorMessage = error.error.message || "Une erreur inconnue est survenue.";
        this.loading = false;
      }
    });

  }



}
