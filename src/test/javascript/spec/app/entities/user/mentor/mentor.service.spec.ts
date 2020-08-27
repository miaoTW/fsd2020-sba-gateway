import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { MentorService } from 'app/entities/user/mentor/mentor.service';
import { IMentor, Mentor } from 'app/shared/model/user/mentor.model';

describe('Service Tests', () => {
  describe('Mentor Service', () => {
    let injector: TestBed;
    let service: MentorService;
    let httpMock: HttpTestingController;
    let elemDefault: IMentor;
    let expectedResult;
    let currentDate: moment.Moment;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = {};
      injector = getTestBed();
      service = injector.get(MentorService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new Mentor(0, 'AAAAAAA', 'AAAAAAA', currentDate, 'AAAAAAA', 0, false);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            regDatetime: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );
        service
          .find(123)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: elemDefault });
      });

      it('should create a Mentor', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            regDatetime: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            regDatetime: currentDate
          },
          returnedFromService
        );
        service
          .create(new Mentor(null))
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should update a Mentor', () => {
        const returnedFromService = Object.assign(
          {
            username: 'BBBBBB',
            linkedinUrl: 'BBBBBB',
            regDatetime: currentDate.format(DATE_TIME_FORMAT),
            regCode: 'BBBBBB',
            yearsOfExperience: 1,
            active: true
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            regDatetime: currentDate
          },
          returnedFromService
        );
        service
          .update(expected)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should return a list of Mentor', () => {
        const returnedFromService = Object.assign(
          {
            username: 'BBBBBB',
            linkedinUrl: 'BBBBBB',
            regDatetime: currentDate.format(DATE_TIME_FORMAT),
            regCode: 'BBBBBB',
            yearsOfExperience: 1,
            active: true
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            regDatetime: currentDate
          },
          returnedFromService
        );
        service
          .query(expected)
          .pipe(
            take(1),
            map(resp => resp.body)
          )
          .subscribe(body => (expectedResult = body));
        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a Mentor', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
