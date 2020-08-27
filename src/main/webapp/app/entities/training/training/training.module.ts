import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from 'app/shared/shared.module';
import { TrainingComponent } from './training.component';
import { TrainingDetailComponent } from './training-detail.component';
import { TrainingUpdateComponent } from './training-update.component';
import { TrainingDeletePopupComponent, TrainingDeleteDialogComponent } from './training-delete-dialog.component';
import { trainingRoute, trainingPopupRoute } from './training.route';

const ENTITY_STATES = [...trainingRoute, ...trainingPopupRoute];

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    TrainingComponent,
    TrainingDetailComponent,
    TrainingUpdateComponent,
    TrainingDeleteDialogComponent,
    TrainingDeletePopupComponent
  ],
  entryComponents: [TrainingDeleteDialogComponent]
})
export class TrainingTrainingModule {}
