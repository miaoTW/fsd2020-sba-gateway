import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { MentorUpdateComponent } from 'app/entities/user/mentor/mentor-update.component';
import { MentorService } from 'app/entities/user/mentor/mentor.service';
import { Mentor } from 'app/shared/model/user/mentor.model';

describe('Component Tests', () => {
  describe('Mentor Management Update Component', () => {
    let comp: MentorUpdateComponent;
    let fixture: ComponentFixture<MentorUpdateComponent>;
    let service: MentorService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [MentorUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(MentorUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(MentorUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(MentorService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Mentor(123);
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
        const entity = new Mentor();
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
