import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { IOption, Option } from 'app/shared/model/options.model';
import { IMentorSkill, MentorSkill } from 'app/shared/model/search/mentorSkill.model';
import { ITraining, Training } from 'app/shared/model/search/traning.model';

type EntityResponseWithOptionsType = HttpResponse<Option[]>;
type EntityResponseType = HttpResponse<MentorSkill[]>;

@Injectable({ providedIn: 'root' })
export class SearchService {
  public resourceUrl = SERVER_API_URL + 'services/search/api/';

  constructor(protected http: HttpClient) {}

  findSkill(): Observable<EntityResponseWithOptionsType> {
    return this.http.get<IOption[]>(`${this.resourceUrl}skills/options`, { observe: 'response' });
  }
  findMentors(skill: number): Observable<EntityResponseType> {
    return this.http.get<IMentorSkill[]>(`${this.resourceUrl}findMentors/${skill}`, { observe: 'response' });
  }

  sendProposal(skill: number, mentor: number, login: string, startDatetime: number, endDatetime: number): Observable<HttpResponse<any>> {
    const copy = {
      skillId: skill,
      mentorId: mentor,
      login,
      startDatetime: moment(startDatetime).toJSON(),
      endDatetime: moment(endDatetime).toJSON()
    };
    return this.http.post<any>(`${this.resourceUrl}sendProposal`, copy, { observe: 'response' });
  }
}
