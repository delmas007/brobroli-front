import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router, RouterLink} from "@angular/router";
import {BrobroliService} from "@services/brobroli.service";
import {StateService} from "@services/state.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    RouterLink
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

  constructor(private fb:FormBuilder, private router: Router,private service:BrobroliService,private state: StateService) {
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
    this.service.envoyerCodeReinitialisation(email).subscribe({
      next:(value:any)=>{
        localStorage.setItem("email",email);
        this.router.navigate(['/reset-password'])
      },
      error:(err:any)=>{
        if (err.error && err.error.message) {
          this.errorMessage = err.error.message;
          this.loading = false;
        } else {
          this.loading = false;
          console.log(err);
          this.errorMessage = 'Erreur temporaire du serveur. Veuillez réessayer plus tard.';
        }
      },
      complete:()=>{
        this.loading = false;
      }
    })
  }

}
