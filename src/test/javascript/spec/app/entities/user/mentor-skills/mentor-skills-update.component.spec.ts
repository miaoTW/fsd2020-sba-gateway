import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { MentorSkillsUpdateComponent } from 'app/entities/user/mentor-skills/mentor-skills-update.component';
import { MentorSkillsService } from 'app/entities/user/mentor-skills/mentor-skills.service';
import { MentorSkills } from 'app/shared/model/user/mentor-skills.model';

describe('Component Tests', () => {
  describe('MentorSkills Management Update Component', () => {
    let comp: MentorSkillsUpdateComponent;
    let fixture: ComponentFixture<MentorSkillsUpdateComponent>;
    let service: MentorSkillsService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [MentorSkillsUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(MentorSkillsUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(MentorSkillsUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(MentorSkillsService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new MentorSkills(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new MentorSkills();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
