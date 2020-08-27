import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IMentorSkills } from 'app/shared/model/user/mentor-skills.model';
import { MentorSkillsService } from './mentor-skills.service';

@Component({
  selector: 'jhi-mentor-skills-delete-dialog',
  templateUrl: './mentor-skills-delete-dialog.component.html'
})
export class MentorSkillsDeleteDialogComponent {
  mentorSkills: IMentorSkills;

  constructor(
    protected mentorSkillsService: MentorSkillsService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.mentorSkillsService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'mentorSkillsListModification',
        content: 'Deleted an mentorSkills'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-mentor-skills-delete-popup',
  template: ''
})
export class MentorSkillsDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ mentorSkills }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(MentorSkillsDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.mentorSkills = mentorSkills;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/mentor-skills', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/mentor-skills', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          }
        );
      }, 0);
    });
  }

  ngOnDestroy() {
    this.ngbModalRef = null;
  }
}
