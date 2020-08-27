import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from 'app/shared/shared.module';
import { MentorSkillsComponent } from './mentor-skills.component';
import { MentorSkillsDetailComponent } from './mentor-skills-detail.component';
import { MentorSkillsUpdateComponent } from './mentor-skills-update.component';
import { MentorSkillsDeletePopupComponent, MentorSkillsDeleteDialogComponent } from './mentor-skills-delete-dialog.component';
import { mentorSkillsRoute, mentorSkillsPopupRoute } from './mentor-skills.route';

const ENTITY_STATES = [...mentorSkillsRoute, ...mentorSkillsPopupRoute];

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    MentorSkillsComponent,
    MentorSkillsDetailComponent,
    MentorSkillsUpdateComponent,
    MentorSkillsDeleteDialogComponent,
    MentorSkillsDeletePopupComponent
  ],
  entryComponents: [MentorSkillsDeleteDialogComponent]
})
export class UserMentorSkillsModule {}
