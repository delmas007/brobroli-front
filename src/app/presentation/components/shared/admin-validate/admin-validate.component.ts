import {Component, OnInit, signal} from '@angular/core';
import { CommonModule } from '@angular/common';
import {BrobroliService} from "@services/brobroli.service";
import {ServiceAttente} from "@interfaces/ServiceAttente";
@Component({
  selector: 'app-admin-validate',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-validate.component.html',
  styleUrl: './admin-validate.component.css'
})
export class AdminValidateComponent implements OnInit {
  services = signal<ServiceAttente[]>([]);
  constructor(private service:BrobroliService) { }

  ngOnInit(): void {
    this.fetchServices()
  }
  private fetchServices(): void {
    this.service.getServices().subscribe({
      next: (data) => {
        console.log(data);
        this.services.set(data.filter((service: any) => service.status === 'ON_HOLD'));
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  validate(id_service:number): void {
    this.service.validSercice(id_service).subscribe({
      next: (data) => {
        this.fetchServices();
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
  invalid(id_service:number): void {
    this.service.rejectService(id_service).subscribe({
      next: (data) => {
        this.fetchServices();
      },
      error: (error) => {
        console.log(error);
      }
    });
  }


}
