import { Component, OnInit } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { RatingModule } from 'primeng/rating';
interface Column {
  field: string;
  header: string;
}
interface Users{
  urlProfile:string
  name:string
  role:string
}
@Component({
  selector: 'app-admin-accueil',
  standalone: true,
  imports: [TableModule, TagModule, RatingModule, ChartModule],
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
      { urlProfile: 'path/to/image1.jpg', name: 'John Doe', role: 'Client' },
      { urlProfile: 'path/to/image2.jpg', name: 'Jane Smith', role: 'Client' },
      { urlProfile: 'path/to/image3.jpg', name: 'Emily Johnson', role: 'Prestataire' },
      { urlProfile: 'path/to/image3.jpg', name: 'Delon Jean-Philippe', role: 'Prestataire' }
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
                backgroundColor: ['#14c0b7', '#113634', '#113634'],
                hoverBackgroundColor: ['#14c0b7', '#113634', '#113634']
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
      }
  };
  }
}
