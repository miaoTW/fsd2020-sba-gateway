import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { ITraining, Training } from 'app/shared/model/training/training.model';
import { TrainingService } from './training.service';

@Component({
  selector: 'jhi-training-update',
  templateUrl: './training-update.component.html'
})
export class TrainingUpdateComponent implements OnInit {
  isSaving: boolean;
  startDateDp: any;
  endDateDp: any;

  editForm = this.fb.group({
    id: [],
    status: [],
    progress: [],
    fees: [],
    commissionAmount: [],
    rating: [],
    startDate: [],
    endDate: [],
    startTime: [],
    endTime: [],
    amountReceived: [],
    userId: [],
    mentorId: [],
    skillId: [],
    razorpayPaymentId: []
  });

  constructor(protected trainingService: TrainingService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ training }) => {
      this.updateForm(training);
    });
  }

  updateForm(training: ITraining) {
    this.editForm.patchValue({
      id: training.id,
      status: training.status,
      progress: training.progress,
      fees: training.fees,
      commissionAmount: training.commissionAmount,
      rating: training.rating,
      startDate: training.startDate,
      endDate: training.endDate,
      startTime: training.startTime != null ? training.startTime.format(DATE_TIME_FORMAT) : null,
      endTime: training.endTime != null ? training.endTime.format(DATE_TIME_FORMAT) : null,
      amountReceived: training.amountReceived,
      userId: training.userId,
      mentorId: training.mentorId,
      skillId: training.skillId,
      razorpayPaymentId: training.razorpayPaymentId
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const training = this.createFromForm();
    if (training.id !== undefined) {
      this.subscribeToSaveResponse(this.trainingService.update(training));
    } else {
      this.subscribeToSaveResponse(this.trainingService.create(training));
    }
  }

  private createFromForm(): ITraining {
    return {
      ...new Training(),
      id: this.editForm.get(['id']).value,
      status: this.editForm.get(['status']).value,
      progress: this.editForm.get(['progress']).value,
      fees: this.editForm.get(['fees']).value,
      commissionAmount: this.editForm.get(['commissionAmount']).value,
      rating: this.editForm.get(['rating']).value,
      startDate: this.editForm.get(['startDate']).value,
      endDate: this.editForm.get(['endDate']).value,
      startTime:
        this.editForm.get(['startTime']).value != null ? moment(this.editForm.get(['startTime']).value, DATE_TIME_FORMAT) : undefined,
      endTime: this.editForm.get(['endTime']).value != null ? moment(this.editForm.get(['endTime']).value, DATE_TIME_FORMAT) : undefined,
      amountReceived: this.editForm.get(['amountReceived']).value,
      userId: this.editForm.get(['userId']).value,
      mentorId: this.editForm.get(['mentorId']).value,
      skillId: this.editForm.get(['skillId']).value,
      razorpayPaymentId: this.editForm.get(['razorpayPaymentId']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITraining>>) {
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
