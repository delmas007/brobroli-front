import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";

@Component({
  selector: 'app-reset-passaword',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './reset-passaword.component.html',
  styleUrl: './reset-passaword.component.css'
})
export class ResetPassawordComponent implements OnInit{
  formResetPassword!: FormGroup;
  errorMessage: any;
  loading = false;
  email!: string ;

  constructor(private fb:FormBuilder, private router: Router,private activatedRoute : ActivatedRoute) {
  }
  ngOnInit(): void {
    this.formResetPassword = this.fb.group({
      resetCode: this.fb.control("", [Validators.required, Validators.pattern(/^\d{6}$/)]),
      newPassword: this.fb.control("", [Validators.required, Validators.minLength(8)]),
      confirmPassword: this.fb.control("", [Validators.required, Validators.minLength(8)]),

    });
  }

  handleResetPassword() {
    let newPassword = this.formResetPassword.value.newPassword;
    let confirmPassword = this.formResetPassword.value.confirmPassword;
    let resetCode = this.formResetPassword.value.resetCode;
    this.loading = true;
    this.errorMessage = null;
    if (this.formResetPassword.invalid) {
      this.errorMessage = "Veuillez corriger les erreurs dans le formulaire.";
      return;
    }
    if (newPassword === confirmPassword) {
      this.email = this.activatedRoute.snapshot.params['email']
      /*this.apiService.nouveauMotDePasse(this.email, resetCode, newPassword)
        .then((token: any) => {
          this.router.navigateByUrl("/connexion")
        })
        .catch(err => {
          this.loading = false;
          if (err.error && err.error.message) {
            this.errorMessage = err.error.message;
          } else {
            this.errorMessage = 'Erreur temporaire du serveur. Veuillez réessayer plus tard.';
          }
        })
        .finally(() => {
          this.loading = false;
        });*/
    }else {
      this.loading = false;
      this.errorMessage = 'Les mots de passe ne sont pas identiques'
    }

  }

}
