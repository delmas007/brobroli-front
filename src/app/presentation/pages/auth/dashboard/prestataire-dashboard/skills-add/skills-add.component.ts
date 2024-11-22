import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import { Skills } from '@interfaces/Skills';
import { BrobroliService } from '@services/brobroli.service';
import { StateService } from '@services/state.service';
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-skills-add',
  standalone: true,
  templateUrl: './skills-add.component.html',
  imports: [
    ReactiveFormsModule,
    MatIcon,
    RouterLink
  ],
  styleUrls: ['./skills-add.component.css']
})
export class SkillsAddComponent implements OnInit {
  formSkills!: FormGroup;
  skill: Skills = {
    skillLevel: '',
    skillName: ''
  };
  isModalOpen: boolean = false; // État pour gérer l'affichage du modal

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private service: BrobroliService,
    private state: StateService
  ) {}

  ngOnInit(): void {
    this.formSkills = this.fb.group({
      skillName: this.fb.control('', [Validators.required]),
      skillLevel: this.fb.control('', [Validators.required])
    });
  }

  onSkillsSubmit() {
    if (this.formSkills.valid) {
      this.skill.skillName = this.formSkills.value.skillName;
      this.skill.skillLevel = this.formSkills.value.skillLevel;

      this.service.saveSkill(this.state.authState.id, this.skill).subscribe(
        (data) => {
          console.log('Compétence ajoutée avec succès :', data);
          this.formSkills.reset();
          this.openModal(); // Affiche le modal après le succès
        },
        (error) => {
          console.error('Erreur lors de l\'ajout de la compétence :', error);
        }
      );
    }
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }
}
