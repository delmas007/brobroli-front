import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent implements OnInit{
  formResetPassword!: FormGroup;
  errorMessage: any;
  loading = false;


  goToFormResetPassword(): void {
    this.router.navigate(['/reset-password']);
  }

  constructor(private fb:FormBuilder, private router: Router) {
  }

  ngOnInit(): void {
    this.formResetPassword = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  handleResetPassword() {
    let email = this.formResetPassword.value.email;
    this.loading = true;
    this.errorMessage = null;
    if (this.formResetPassword.invalid) {
      this.errorMessage = "Veuillez corriger les erreurs dans le formulaire.";
      return;
    }
    /*this.apiService.codeMotDePasse(email)
      .then((token: any) => {
        this.router.navigateByUrl(`/modifier-mot-de-passe/${email}`);
      })
      .catch((err: any)=> {
        if (err.error && err.error.message) {
          this.errorMessage = err.error.message;
        } else {
          this.loading = false;
          console.log(err);
          this.errorMessage = 'Erreur temporaire du serveur. Veuillez réessayer plus tard.';
        }
      })
      .finally(() => {
        this.loading = false;
      });*/
  }

}
