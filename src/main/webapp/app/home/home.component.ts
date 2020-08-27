import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { LoginModalService } from 'app/core/login/login-modal.service';
import { AccountService } from 'app/core/auth/account.service';
import { Account } from 'app/core/user/account.model';
import { SearchService } from 'app/home/search.service';
import { IOption } from 'app/shared/model/options.model';
import { MentorSkill } from 'app/shared/model/search/mentorSkill.model';
import * as moment from 'moment';
@Component({
  selector: 'jhi-home',
  templateUrl: './home.component.html',
  styleUrls: ['home.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  account: Account;
  authSubscription: Subscription;
  modalRef: NgbModalRef;
  routeData: any;
  searchValue: number;
  isSearched: boolean;
  page: any;
  previousPage: any;
  totalItems: any;
  itemsPerPage: any;
  reverse: any;
  predicate: any;
  activatedIndex = 0;

  public skillList = [] as IOption[];
  public mentorSkills = [] as MentorSkill[];

  constructor(
    private accountService: AccountService,
    private loginModalService: LoginModalService,
    private searchService: SearchService,
    private eventManager: JhiEventManager,
    protected jhiAlertService: JhiAlertService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router
  ) {}

  ngOnInit() {
    this.accountService.identity().subscribe((account: Account) => {
      this.account = account;
    });
    this.registerAuthenticationSuccess();

    this.searchService.findSkill().subscribe(
      (res: HttpResponse<IOption[]>) => {
        if (res.body) {
          this.skillList = res.body;
          if (this.skillList.length > 0) {
            this.searchValue = this.skillList[0].id;
          }
        }
      },
      (res: HttpErrorResponse) => (this.skillList = [])
    );
  }

  registerAuthenticationSuccess() {
    this.authSubscription = this.eventManager.subscribe('authenticationSuccess', message => {
      this.accountService.identity().subscribe(account => {
        this.account = account;
      });
    });
  }

  isAuthenticated() {
    return this.accountService.isAuthenticated();
  }

  login() {
    this.modalRef = this.loginModalService.open();
  }

  ngOnDestroy() {
    if (this.authSubscription) {
      this.eventManager.destroy(this.authSubscription);
    }
  }
  search() {
    if (this.searchValue) {
      this.isSearched = false;
      this.searchService.findMentors(this.searchValue).subscribe(
        (res: HttpResponse<MentorSkill[]>) => {
          if (res.body) {
            this.mentorSkills = res.body;
            this.mentorSkills.forEach(item => {
              item.mentorCalendarList.forEach(calendar => {
                calendar.endDatetime = moment(calendar.endDatetime);
                calendar.startDatetime = moment(calendar.startDatetime);
              });
            });
          }
        },
        (res: HttpErrorResponse) => (this.mentorSkills = [])
      );
    }
  }
  setSelection(searchValue) {
    this.searchValue = searchValue;
  }
  sendProposal(skillId: number, mentorId: number, selection: HTMLSelectElement) {
    const time = selection.value.split('-');
    alert(time[0]);
    alert(time[1]);
    this.searchService
      .sendProposal(skillId, mentorId, this.accountService.getUserId(), parseInt(time[0], 10), parseInt(time[1], 10))
      .subscribe((res: HttpResponse<any>) => {});
  }
}
