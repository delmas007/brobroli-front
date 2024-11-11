import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';

interface Users{
  urlProfile:string
  name:string
  role:string
}
@Component({
  selector: 'app-admin-customers',
  standalone: true,
  imports: [TableModule],
  templateUrl: './admin-customers.component.html',
  styleUrl: './admin-customers.component.css'
})


export class AdminCustomersComponent implements OnInit {
  users!: Users[];
  
  ngOnInit(): void {
    this.users = [
      { urlProfile: 'path/to/image1.jpg', name: 'John Doe', role: 'Client' },
      { urlProfile: 'path/to/image2.jpg', name: 'Jane Smith', role: 'Client' },
      { urlProfile: 'path/to/image3.jpg', name: 'Emily Johnson', role: 'Prestataire' },
      { urlProfile: 'path/to/image3.jpg', name: 'Delon Jean-Philippe', role: 'Prestataire' }
    ];
  }

}
