import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'mentor-skills',
        loadChildren: () => import('./user/mentor-skills/mentor-skills.module').then(m => m.UserMentorSkillsModule)
      },
      {
        path: 'mentor',
        loadChildren: () => import('./user/mentor/mentor.module').then(m => m.UserMentorModule)
      },
      {
        path: 'training',
        loadChildren: () => import('./training/training/training.module').then(m => m.TrainingTrainingModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class GatewayEntityModule {}
