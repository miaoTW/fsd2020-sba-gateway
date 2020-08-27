import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IMentor } from 'app/shared/model/user/mentor.model';

@Component({
  selector: 'jhi-mentor-detail',
  templateUrl: './mentor-detail.component.html'
})
export class MentorDetailComponent implements OnInit {
  mentor: IMentor;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ mentor }) => {
      this.mentor = mentor;
    });
  }

  previousState() {
    window.history.back();
  }
}
