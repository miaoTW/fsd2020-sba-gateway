import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IMentorSkills } from 'app/shared/model/user/mentor-skills.model';

@Component({
  selector: 'jhi-mentor-skills-detail',
  templateUrl: './mentor-skills-detail.component.html'
})
export class MentorSkillsDetailComponent implements OnInit {
  mentorSkills: IMentorSkills;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ mentorSkills }) => {
      this.mentorSkills = mentorSkills;
    });
  }

  previousState() {
    window.history.back();
  }
}
