import {Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {Router, RouterModule} from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {BrobroliService} from "@services/brobroli.service";
import {Service} from "@interfaces/Service";
import {StateService} from "@services/state.service";

@Component({
  selector: 'app-services-page',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, CommonModule, FormsModule, MatIconModule],
  templateUrl: './services-page.component.html',
  styleUrl: './services-page.component.css'
})
export class ServicesPageComponent implements OnInit {
  servicesForm!: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';
  donnee: Service = {
    typeService: "",
    description: "",
    price: 0,
    duration: 0
  }
  constructor(private router: Router,private fb:FormBuilder,private service: BrobroliService,private state:StateService) {

  }

  ngOnInit(): void {
    this.servicesForm = this.fb.group({
      typeService: this.fb.control("", [Validators.required]),
      description: this.fb.control("", [Validators.required]),
      price: this.fb.control("", [Validators.required]),
      duration: this.fb.control("", [Validators.required]),
    });
  }

  onServicesSubmit(){
    this.donnee.typeService = this.servicesForm.value.typeService;
    this.donnee.description = this.servicesForm.value.description;
    this.donnee.price = this.servicesForm.value.price;
    this.donnee.duration = this.servicesForm.value.duration;
    this.service.saveService(this.donnee,this.state.authState.id).subscribe(
      data => {
        console.log(data);
        this.servicesForm.reset();
      },
      error => {
        console.log(error);
        this.servicesForm.reset();
        this.successMessage = 'Service ajouté avec succès';
      }
    );
  }


}
