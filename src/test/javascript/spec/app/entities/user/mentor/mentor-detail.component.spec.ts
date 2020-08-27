import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { MentorDetailComponent } from 'app/entities/user/mentor/mentor-detail.component';
import { Mentor } from 'app/shared/model/user/mentor.model';

describe('Component Tests', () => {
  describe('Mentor Management Detail Component', () => {
    let comp: MentorDetailComponent;
    let fixture: ComponentFixture<MentorDetailComponent>;
    const route = ({ data: of({ mentor: new Mentor(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [MentorDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(MentorDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(MentorDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.mentor).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
