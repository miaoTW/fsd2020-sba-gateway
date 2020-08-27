import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IMentor } from 'app/shared/model/user/mentor.model';

type EntityResponseType = HttpResponse<IMentor>;
type EntityArrayResponseType = HttpResponse<IMentor[]>;

@Injectable({ providedIn: 'root' })
export class MentorService {
  public resourceUrl = SERVER_API_URL + 'services/user/api/mentors';

  constructor(protected http: HttpClient) {}

  create(mentor: IMentor): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(mentor);
    return this.http
      .post<IMentor>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(mentor: IMentor): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(mentor);
    return this.http
      .put<IMentor>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IMentor>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IMentor[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(mentor: IMentor): IMentor {
    const copy: IMentor = Object.assign({}, mentor, {
      regDatetime: mentor.regDatetime != null && mentor.regDatetime.isValid() ? mentor.regDatetime.toJSON() : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.regDatetime = res.body.regDatetime != null ? moment(res.body.regDatetime) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((mentor: IMentor) => {
        mentor.regDatetime = mentor.regDatetime != null ? moment(mentor.regDatetime) : null;
      });
    }
    return res;
  }
}
