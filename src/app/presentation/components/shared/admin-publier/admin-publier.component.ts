import {Component, signal} from '@angular/core';
import {DatePipe, NgForOf} from "@angular/common";
import {ServiceAttente} from "@interfaces/ServiceAttente";
import {BrobroliService} from "@services/brobroli.service";

@Component({
  selector: 'app-admin-publier',
  standalone: true,
    imports: [
        DatePipe,
        NgForOf
    ],
  templateUrl: './admin-publier.component.html',
  styleUrl: './admin-publier.component.css'
})
export class AdminPublierComponent {
  services = signal<ServiceAttente[]>([]);
  constructor(private service:BrobroliService) { }

  ngOnInit(): void {
    this.fetchServices()
  }
  private fetchServices(): void {
    this.service.getServices().subscribe({
      next: (data) => {
        console.log(data);
        this.services.set(data.filter((service: any) => service.status === 'VALID'));
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
