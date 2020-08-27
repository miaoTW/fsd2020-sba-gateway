import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IMentorSkills } from 'app/shared/model/user/mentor-skills.model';

type EntityResponseType = HttpResponse<IMentorSkills>;
type EntityArrayResponseType = HttpResponse<IMentorSkills[]>;

@Injectable({ providedIn: 'root' })
export class MentorSkillsService {
  public resourceUrl = SERVER_API_URL + 'services/user/api/mentor-skills';

  constructor(protected http: HttpClient) {}

  create(mentorSkills: IMentorSkills): Observable<EntityResponseType> {
    return this.http.post<IMentorSkills>(this.resourceUrl, mentorSkills, { observe: 'response' });
  }

  update(mentorSkills: IMentorSkills): Observable<EntityResponseType> {
    return this.http.put<IMentorSkills>(this.resourceUrl, mentorSkills, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IMentorSkills>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IMentorSkills[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
