import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {BrobroliService} from "@services/brobroli.service";
import {StateService} from "@services/state.service";
import {UpdatePasswordDTO} from "@interfaces/UpdatePasswordDTO";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-reset-passaword',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    NgIf
  ],
  templateUrl: './reset-passaword.component.html',
  styleUrl: './reset-passaword.component.css'
})
export class ResetPassawordComponent implements OnInit{
  formResetPassword!: FormGroup;
  errorMessage: any;
  loading = false;
  email!: string ;
  newPassword:UpdatePasswordDTO ={
    email:'',
    password:'',
    code:''
  };

  constructor(private fb:FormBuilder, private router: Router,private activatedRoute : ActivatedRoute,private service:BrobroliService,private state:StateService) {
  }
  ngOnInit(): void {
    this.formResetPassword = this.fb.group({
      resetCode: this.fb.control("", [Validators.required, Validators.pattern(/^\d{6}$/)]),
      newPassword: this.fb.control("", [Validators.required]),
      confirmPassword: this.fb.control("", [Validators.required]),

    });
  }

  handleResetPassword() {
    console.log('1')
    this.newPassword.password = this.formResetPassword.value.newPassword;
    let confirmPassword = this.formResetPassword.value.confirmPassword;
    this.newPassword.code = this.formResetPassword.value.resetCode;
    // @ts-ignore
    this.newPassword.email= localStorage.getItem("email")
    this.loading = true;
    this.errorMessage = null;
    if (this.formResetPassword.invalid) {
      this.errorMessage = "Veuillez corriger les erreurs dans le formulaire.";
      return;
    }
    if (this.newPassword.password === confirmPassword) {
      this.service.nouveauMotDePasse(this.newPassword).subscribe({
        next:(value:any)=>{
        this.router.navigateByUrl("/login")
      },
        error:(err:any)=>{
          this.loading = false;
          if (err.error && err.error.message) {
            this.errorMessage = err.error.message;
            this.loading = false;
          } else {
            this.errorMessage = 'Erreur temporaire du serveur. Veuillez réessayer plus tard.';
          }
      },
        complete:()=>{
          this.loading = false;
        }
      })
    }else {
      this.loading = false;
      this.errorMessage = 'Les mots de passe ne sont pas identiques'
    }

  }

}
