import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Mentor } from 'app/shared/model/user/mentor.model';
import { MentorService } from './mentor.service';
import { MentorComponent } from './mentor.component';
import { MentorDetailComponent } from './mentor-detail.component';
import { MentorUpdateComponent } from './mentor-update.component';
import { MentorDeletePopupComponent } from './mentor-delete-dialog.component';
import { IMentor } from 'app/shared/model/user/mentor.model';

@Injectable({ providedIn: 'root' })
export class MentorResolve implements Resolve<IMentor> {
  constructor(private service: MentorService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IMentor> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Mentor>) => response.ok),
        map((mentor: HttpResponse<Mentor>) => mentor.body)
      );
    }
    return of(new Mentor());
  }
}

export const mentorRoute: Routes = [
  {
    path: '',
    component: MentorComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      defaultSort: 'id,asc',
      pageTitle: 'Mentors'
    }
  },
  {
    path: ':id/view',
    component: MentorDetailComponent,
    resolve: {
      mentor: MentorResolve
    },
    data: {
      pageTitle: 'Mentors'
    }
  },
  {
    path: 'new',
    component: MentorUpdateComponent,
    resolve: {
      mentor: MentorResolve
    },
    data: {
      pageTitle: 'Mentors'
    }
  },
  {
    path: ':id/edit',
    component: MentorUpdateComponent,
    resolve: {
      mentor: MentorResolve
    },
    data: {
      pageTitle: 'Mentors'
    }
  }
];

export const mentorPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: MentorDeletePopupComponent,
    resolve: {
      mentor: MentorResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Mentors'
    },
    outlet: 'popup'
  }
];
