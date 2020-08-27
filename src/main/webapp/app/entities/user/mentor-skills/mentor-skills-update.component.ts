import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IMentorSkills, MentorSkills } from 'app/shared/model/user/mentor-skills.model';
import { MentorSkillsService } from './mentor-skills.service';

@Component({
  selector: 'jhi-mentor-skills-update',
  templateUrl: './mentor-skills-update.component.html'
})
export class MentorSkillsUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    mId: [null, [Validators.required]],
    sId: [null, [Validators.required]],
    selfRating: [],
    yearsOfExp: [],
    trainingsDelivered: [],
    facilitiesOffered: []
  });

  constructor(protected mentorSkillsService: MentorSkillsService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ mentorSkills }) => {
      this.updateForm(mentorSkills);
    });
  }

  updateForm(mentorSkills: IMentorSkills) {
    this.editForm.patchValue({
      id: mentorSkills.id,
      mId: mentorSkills.mId,
      sId: mentorSkills.sId,
      selfRating: mentorSkills.selfRating,
      yearsOfExp: mentorSkills.yearsOfExp,
      trainingsDelivered: mentorSkills.trainingsDelivered,
      facilitiesOffered: mentorSkills.facilitiesOffered
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const mentorSkills = this.createFromForm();
    if (mentorSkills.id !== undefined) {
      this.subscribeToSaveResponse(this.mentorSkillsService.update(mentorSkills));
    } else {
      this.subscribeToSaveResponse(this.mentorSkillsService.create(mentorSkills));
    }
  }

  private createFromForm(): IMentorSkills {
    return {
      ...new MentorSkills(),
      id: this.editForm.get(['id']).value,
      mId: this.editForm.get(['mId']).value,
      sId: this.editForm.get(['sId']).value,
      selfRating: this.editForm.get(['selfRating']).value,
      yearsOfExp: this.editForm.get(['yearsOfExp']).value,
      trainingsDelivered: this.editForm.get(['trainingsDelivered']).value,
      facilitiesOffered: this.editForm.get(['facilitiesOffered']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMentorSkills>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
}
