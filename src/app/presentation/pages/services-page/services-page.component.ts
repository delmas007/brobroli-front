import {Component, OnInit, OnChanges, SimpleChanges, signal} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { BrobroliService } from "@services/brobroli.service";
import { StateService } from "@services/state.service";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-services-page',
  standalone: true,
  imports: [MatIconModule, ReactiveFormsModule, NgForOf],
  templateUrl: './services-page.component.html',
  styleUrls: ['./services-page.component.css']
})
export class ServicesPageComponent implements OnInit {
  servicesForm!: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';
  isModalOpen: boolean = false;

  typeService: string[] = [
    "DEVELOPPEMENT_WEB",
    "DEVELOPPEMENT_MOBILE",
    "DESIGN_GRAPHIQUE",
    "MARKETING",
    "FORMATION",
    "PHOTOGRAPHIE"
  ]

  titlebyTypeService = signal<string[]>([]);

  serviceObject: { [key: string]: string[] } = {
    DEVELOPPEMENT_WEB: ['HTML', 'CSS', 'ANGULAR'],
    DEVELOPPEMENT_MOBILE: ['ANDROID', 'KOTLIN', 'FLUTTER'],
    DESIGN_GRAPHIQUE: ['Photoshop', 'Illustrator', 'Figma'],
    MARKETING: ['Stratégie de contenu', 'Publicité numérique', 'Analyse et reporting marketing'],
    FORMATION: ['Formation en ligne', 'Coaching professionnel', 'Formation technique'],
    PHOTOGRAPHIE: ['Photographie de portrait', 'Photographie événementielle', 'Retouche photo'],
  };


  constructor(
    private router: Router,
    private fb: FormBuilder,
    private service: BrobroliService,
    private state: StateService
  ) {}

  ngOnInit(): void {
    this.servicesForm = this.fb.group({
      typeService: this.fb.control('', [Validators.required]),
      description: this.fb.control('', [Validators.required]),
      price: this.fb.control('', [Validators.required]),
      duration: this.fb.control('', [Validators.required])
    });
  }

  onServicesSubmit() {
    const serviceData = {
      typeService: this.servicesForm.value.typeService,
      description: this.servicesForm.value.description,
      price: this.servicesForm.value.price,
      duration: this.servicesForm.value.duration
    };

    console.log(serviceData)

    this.service.saveService(this.servicesForm.value, this.state.authState.id).subscribe(
      (data) => {
        console.log('Service ajouté avec succès:', data);
        this.successMessage = 'Service ajouté avec succès !';
        this.servicesForm.reset();
        this.openModal();
      },
      (error) => {
        console.error('Erreur lors de l\'ajout du service:', error);
        this.errorMessage = 'Erreur lors de l\'ajout du service.';
      }
    );
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  showTypeService(service: any) {
    Object.entries(this.serviceObject).forEach(([key, listtypes]) => {

      if(service == key){
        this.titlebyTypeService.update(value => value = listtypes)
        console.log(listtypes)
      }
    });
  }


}
