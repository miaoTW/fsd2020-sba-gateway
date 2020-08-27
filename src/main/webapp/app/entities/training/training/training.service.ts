import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ITraining, IUserTraining } from 'app/shared/model/training/training.model';
import { IUser } from 'app/core/user/user.model';

type EntityResponseType = HttpResponse<ITraining>;
type EntityArrayResponseType = HttpResponse<ITraining[]>;
type UserEntityArrayResponseType = HttpResponse<IUserTraining[]>;

@Injectable({ providedIn: 'root' })
export class TrainingService {
  public resourceUrl = SERVER_API_URL + 'services/training/api/trainings';

  constructor(protected http: HttpClient) {}

  create(training: ITraining): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(training);
    return this.http
      .post<ITraining>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(training: ITraining): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(training);
    return this.http
      .put<ITraining>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ITraining>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ITraining[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  findUser(): Observable<UserEntityArrayResponseType> {
    return this.http.get<IUserTraining[]>(`${this.resourceUrl}/findByUser`, { observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(training: ITraining): ITraining {
    const copy: ITraining = Object.assign({}, training, {
      startDate: training.startDate != null && training.startDate.isValid() ? training.startDate.format(DATE_FORMAT) : null,
      endDate: training.endDate != null && training.endDate.isValid() ? training.endDate.format(DATE_FORMAT) : null,
      startTime: training.startTime != null && training.startTime.isValid() ? training.startTime.toJSON() : null,
      endTime: training.endTime != null && training.endTime.isValid() ? training.endTime.toJSON() : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.startDate = res.body.startDate != null ? moment(res.body.startDate) : null;
      res.body.endDate = res.body.endDate != null ? moment(res.body.endDate) : null;
      res.body.startTime = res.body.startTime != null ? moment(res.body.startTime) : null;
      res.body.endTime = res.body.endTime != null ? moment(res.body.endTime) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((training: ITraining) => {
        training.startDate = training.startDate != null ? moment(training.startDate) : null;
        training.endDate = training.endDate != null ? moment(training.endDate) : null;
        training.startTime = training.startTime != null ? moment(training.startTime) : null;
        training.endTime = training.endTime != null ? moment(training.endTime) : null;
      });
    }
    return res;
  }
}
