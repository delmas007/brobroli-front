import {Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {Router, RouterModule} from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {Skills} from "@interfaces/Skills";
import {BrobroliService} from "@services/brobroli.service";
import {StateService} from "@services/state.service";


@Component({
  selector: 'app-skills-add',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, CommonModule, FormsModule, MatIconModule],
  templateUrl: './skills-add.component.html',
  styleUrl: './skills-add.component.css'
})
export class SkillsAddComponent implements OnInit {
  formSkills!: FormGroup;
  skill: Skills = {
    skillLevel: '',
    skillName: ''
  }
  constructor(private router: Router,private fb:FormBuilder,private service: BrobroliService,private state:StateService) {
  }
  ngOnInit(): void {
    this.formSkills = this.fb.group({
      skillName: this.fb.control("", [Validators.required]),
      skillLevel: this.fb.control("", [Validators.required])
    });
  }
  onSkillsSubmit(){
    this.skill.skillName = this.formSkills.value.skillName;
    this.skill.skillLevel = this.formSkills.value.skillLevel;
    this.service.saveSkill(this.state.authState.id,this.skill).subscribe(
      data => {
        console.log(data);
        this.formSkills.reset();
      },
      error => {
        console.log(error);
      }
    )
  }


}
