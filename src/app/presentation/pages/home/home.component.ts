import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '@layout/navbar/navbar.component';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { CommonModule } from '@angular/common';
import * as AOS from 'aos';
import {BrobroliService} from "@services/brobroli.service";
import {StateService} from "@services/state.service";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent, RouterOutlet, RouterLink, RouterLinkActive, FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit  {
  searchForm!: FormGroup;
  constructor(private router: Router,private fb:FormBuilder,private service: BrobroliService,private state:StateService) {
  }

  services = [
    { value: 'DEVELOPPEMENT_MOBILE', label: 'Développement mobile' },
    { value: 'DEVELOPPEMENT_WEB', label: 'Développement web' },
    { value: 'DESIGN_GRAPHIQUE', label: 'Design graphique' },
    { value: 'FORMATION', label: 'Formation' },
    { value: 'MARKETING', label: 'Marketing digital' },
    { value: 'PHOTOGRAPHIE', label: 'Photographie' }
  ];

  priceRanges = [
    { value: '25000-100000', label: '25k-100k' },
    { value: '100000-300000', label: '100k-300k' },
    { value: '300000-600000', label: '300k-600k' },
    { value: '600000-1000000', label: '600k-1M' }
  ];
  ngOnInit(): void {
    AOS.init();
    this.searchForm = this.fb.group({
      typeService: this.fb.control("", [Validators.required]),
      tranche: this.fb.control("", [Validators.required])
    });
  }

  onSearch() {
    const typeService = this.searchForm.value.typeService;
    const [minPrice, maxPrice] = this.searchForm.value.tranche.split('-');
    this.router.navigateByUrl(`/search/${typeService}/${minPrice}/${maxPrice}`);
  }
}
