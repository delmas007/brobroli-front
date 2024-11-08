import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {BrobroliService} from "@services/brobroli.service";
import {StateService} from "@services/state.service";
import {response} from "express";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-verify-code',
  standalone: true,
  imports: [
    FormsModule,
    NgIf
  ],
  templateUrl: './verify-code.component.html',
  styleUrl: './verify-code.component.css'
})
export class VerifyCodeComponent implements OnInit {
  digits: string[] = new Array(6).fill('');
  isError: boolean = false;
  resendDisabled: boolean = false;
  countdownTimer: number = 3;
  email!: string | null ;
  code: string[] = ['', '', '', '', '', ''];

  constructor(private http: HttpClient, private router: Router, private activatedRoute: ActivatedRoute,private service:BrobroliService,private state:StateService) {}

  ngOnInit() {
    this.startCountdown();
  }

  startCountdown() {
    this.resendDisabled = true;
    const interval = setInterval(() => {
      this.countdownTimer--;
      if (this.countdownTimer <= 0) {
        clearInterval(interval);
        this.resendDisabled = false;
        this.countdownTimer = 30;
      }
    }, 1000);
  }

  verifyCode() {
    const code = this.code.join('');
   this.service.activationCompte(code).subscribe({
     next:(value:any)=>{
       this.router.navigateByUrl("/login");
     },
     error:(error:any)=>{
       this.isError = true;
       const inputs = document.querySelectorAll('.code-inputs input');
       inputs.forEach(input => input.classList.add('shake'));

       setTimeout(() => {
         this.isError = false;
         inputs.forEach(input => input.classList.remove('shake'));
       }, 1000);
     }
   })
  }

  resendCode() {
    this.countdownTimer = 30;
    this.startCountdown();
    this.email = localStorage.getItem("email");
    // @ts-ignore
    this.service.renvoyerMail(this.email).subscribe({
      next:(response:any)=>{
      console.log('Code renvoyé avec succès', response)
    },
      error:(error:any)=>{
        console.log('Erreur lors de l\'envoi du code', error)
      }
    })
  }

  onResendClick(event: Event) {
    event.preventDefault();
    this.resendCode();
  }

  moveFocus(event: any, index: number): void {
    const input = event.target as HTMLInputElement;
    if (!/^\d$/.test(input.value)) {
      input.value = '';
      return;
    }
    if (input.value.length > 0 && index < this.code.length - 1) {
      const nextInput = document.querySelectorAll('.code-inputs input')[index + 1] as HTMLInputElement;
      nextInput.focus();
    } else {
      this.verifyCode();
    }
  }

  handlePaste(event: ClipboardEvent) {
    event.preventDefault();
    const clipboardData = event.clipboardData || (window as any).clipboardData;
    const pastedData = clipboardData.getData('Text').trim();

    if (/^\d{6}$/.test(pastedData)) {
      for (let i = 0; i < this.code.length; i++) {
        this.code[i] = pastedData[i] || '';
      }
      this.verifyCode();
    }
  }
}
