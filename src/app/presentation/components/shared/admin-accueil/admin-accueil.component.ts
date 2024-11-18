import { Component, OnInit } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { RatingModule } from 'primeng/rating';
import {RouterLink} from "@angular/router";
interface Column {
  field: string;
  header: string;
}
interface Users{
  urlProfile:string
  name:string
  role:string
  prenom:string
}
@Component({
  selector: 'app-admin-accueil',
  standalone: true,
  imports: [TableModule, TagModule, RatingModule, ChartModule, RouterLink],
  templateUrl: './admin-accueil.component.html',
  styleUrl: './admin-accueil.component.css'
})
export class AdminAccueilComponent implements OnInit {
  data: any;
  options: any;
  users!: Users[];
  cols!: Column[];

  ngOnInit() {


    this.users = [
      { urlProfile: 'personne (1).png', name: 'John',prenom:'Doe', role: 'Client' },
      { urlProfile: 'personne (1).png', name: 'Jane',prenom:'Smith', role: 'Client' },
      { urlProfile: 'personne (1).png', name: 'Emily',prenom:'Johnson', role: 'Prestataire' },
      { urlProfile: 'personne (1).png', name: 'Delon',prenom:'Jean-Philippe', role: 'Prestataire' }
    ];
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--text-color');
      const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
      const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
      this.cols = [
        { field: 'Profile', header: 'Profile' },
        { field: 'Nom', header: 'Nom' },
        { field: 'Role', header: 'Role' },
        { field: 'quantity', header: 'Quantity' },
        { field: 'inventoryStatus', header: 'Status' },
    ];
      this.data = {
        labels: ['Client', 'Prestataire'],
        datasets: [
            {
                data: [9, 21],
              backgroundColor: ['#14c0b7', '#28a745'],
              hoverBackgroundColor: ['#12a299', '#218838']
            }
        ]
    };

    this.options = {
      cutout: '60%',
      plugins: {
          legend: {
              labels: {
                  color: textColor
              }
          }
      },
      responsive: true,
      maintainAspectRatio: false,
      backgroundColor: 'white'
  };
  }
}
