import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { MentorSkillsDetailComponent } from 'app/entities/user/mentor-skills/mentor-skills-detail.component';
import { MentorSkills } from 'app/shared/model/user/mentor-skills.model';

describe('Component Tests', () => {
  describe('MentorSkills Management Detail Component', () => {
    let comp: MentorSkillsDetailComponent;
    let fixture: ComponentFixture<MentorSkillsDetailComponent>;
    const route = ({ data: of({ mentorSkills: new MentorSkills(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [MentorSkillsDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(MentorSkillsDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(MentorSkillsDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.mentorSkills).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
