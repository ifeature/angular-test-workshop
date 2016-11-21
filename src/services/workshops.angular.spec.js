import WorkshopsService from './workshops.service';
import q from 'q';

describe('WorkshopsService', () => {
  let $http;
  let $q;
  let $timeout;
  let $httpBackend;
  let sut;
  let deferred;

  beforeEach(() => {
    inject((_$q_, _$timeout_, _$http_, _$httpBackend_) => {
      $q = _$q_;
      $timeout = _$timeout_;
      $http = _$http_;
      $httpBackend = _$httpBackend_;
    });

    //spyOn($http, 'get'); // spy
    sut = new WorkshopsService($http);
    //deferred = $q.defer(); в  $q не создаем deferred-объекты $q.when, $q.reject
    //$http.get.and.returnValue($q.when());
    //$http.post.and.returnValue($q.when());
  });

  afterEach(() => {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  describe('#getWorkshops', () => {
    it('should use correct endpoint for fetching worksops', () => {
      $httpBackend.expectGET('api/workshops').respond(200, {}); // expect
      sut.getWorkshops();
      $httpBackend.flush();
    });

    it('should parse data from response', () => {
      const workshops = [{name: 'whatever'}];
      $httpBackend.expectGET('api/workshops').respond(200, {data: workshops});
      //$http.get.and.returnValue($q.when({data: workshops}));
      const cb = jasmine.createSpy('cb'); // cb

      sut.getWorkshops().then(cb);
      $httpBackend.flush();
      //$timeout.flush(); // Вызывает коллбэки в очереди синхронно для ангулоровских операций $q
      expect(cb).toHaveBeenCalledWith({data: workshops}); // workshops
    });

    xit('should reject errors', (done) => {
      const response = {};
      response.errors = {name: 'err'};
      deferred.reject(response);

      sut.getWorkshops()
        .finally((errors) => {   // finally
          console.log('catch');
          expect(errors).toBe({name: 'err'});
          done();
        });
    });
  });

  describe('#addWorkshop', () => {
    fit('should be called', () => {
      const workshop = {title: 'lorem'};
      //deferred.resolve(workshop);
      sut.addWorkshop(workshop);
      expect($http.post).toHaveBeenCalledWith('api/workshops', {workshop});
    });

    it('should send post data', (done) => {  // x, f
      const response = {};
      const workshop = {title: 'lorem'};
      response.data = workshop;
      deferred.resolve(response);

      sut.addWorkshop('api/workshops', {workshop})
        .done((data) => {
          console.log('done: post');
          expect(data).toBe(workshop);
          done();
        });
    });
  });

  describe('#getWorkshopById', () => {
    it('should be called', () => {
      const id = 1;
      const response = {};
      const workshop = {title: 'lorem'};
      deferred.resolve(workshop);

      sut.getWorkshopById(id);
      expect($http.get).toHaveBeenCalledWith(`api/workshops/${id}`);
    });

    it('should return response data', (done) => {
      const response = {};
      const workshop = {title: 'lorem'};
      const id = 1;
      response.data = workshop;
      deferred.resolve(response);

      sut.addWorkshop(id)
        .done((data) => {
          expect(data).toBe(workshop);
          done();
        })
    });
  });



});
