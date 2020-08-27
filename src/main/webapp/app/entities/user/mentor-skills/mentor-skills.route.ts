import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { MentorSkills } from 'app/shared/model/user/mentor-skills.model';
import { MentorSkillsService } from './mentor-skills.service';
import { MentorSkillsComponent } from './mentor-skills.component';
import { MentorSkillsDetailComponent } from './mentor-skills-detail.component';
import { MentorSkillsUpdateComponent } from './mentor-skills-update.component';
import { MentorSkillsDeletePopupComponent } from './mentor-skills-delete-dialog.component';
import { IMentorSkills } from 'app/shared/model/user/mentor-skills.model';

@Injectable({ providedIn: 'root' })
export class MentorSkillsResolve implements Resolve<IMentorSkills> {
  constructor(private service: MentorSkillsService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IMentorSkills> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<MentorSkills>) => response.ok),
        map((mentorSkills: HttpResponse<MentorSkills>) => mentorSkills.body)
      );
    }
    return of(new MentorSkills());
  }
}

export const mentorSkillsRoute: Routes = [
  {
    path: '',
    component: MentorSkillsComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'MentorSkills'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: MentorSkillsDetailComponent,
    resolve: {
      mentorSkills: MentorSkillsResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'MentorSkills'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: MentorSkillsUpdateComponent,
    resolve: {
      mentorSkills: MentorSkillsResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'MentorSkills'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: MentorSkillsUpdateComponent,
    resolve: {
      mentorSkills: MentorSkillsResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'MentorSkills'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const mentorSkillsPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: MentorSkillsDeletePopupComponent,
    resolve: {
      mentorSkills: MentorSkillsResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'MentorSkills'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
