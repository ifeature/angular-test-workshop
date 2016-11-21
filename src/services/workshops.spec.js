import WorkshopsService from './workshops.service';
import q from 'q';

xdescribe('WorkshopsService', () => {
  let $http;
  let sut;
  let deferred;

  beforeAll(() => { // Вызывается один раз перед всеми тестами

  });

  afterAll(() => {

  });

  afterEach(() => {

  });

  beforeEach(() => {
    $http = jasmine.createSpyObj('$http', ['get', 'post']); // createSpyObj
    // $http = {
    //   get: jasmine.createSpy('get')
    // };
    sut = new WorkshopsService($http, q);
    deferred = q.defer();
    $http.get.and.returnValue(deferred.promise);
    $http.post.and.returnValue(deferred.promise);
  });

  describe('#getWorkshops', () => {    // method of service #method
    it('should use correct endpoint for fetching worksops', () => {
      // const $http = {
      //   get: jasmine.createSpy('get') // возвращает undefined отслеживает, когда ее вызывали
      // };
      // $http.get.and.returnValue({
      //   then: () => {}
      // });

      //const deferred = q.defer(); // deferred-объект deferred.promise с методами then, catch
      //$http.get.and.returnValue(deferred.promise);

      //const sut = new WorkshopsService($http);
      sut.getWorkshops();
      console.log($http.get.calls.count());  // метод для jasmine.spy
      console.log($http.get.calls.mostRecent().args); // аргументы
      expect($http.get).toHaveBeenCalledWith('api/workshops'); // toHaveBeenCalled
    });

    it('should parse data from response', (done) => {
      const responseData = {workshops: []};
      // const $http = {
      //   get: jasmine.createSpy('get')
      // };

      //const deferred = q.defer();
      //$http.get.and.returnValue(deferred.promise);

      //const sut = new WorkshopsService($http);
      const response = {data: responseData};
      deferred.resolve(response);

      sut.getWorkshops()
        .done((data) => {
          console.log('done');
          expect(data).toBe(responseData);
          done(); // тест раннер ждет асинхронные операции
        });
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
    it('should be called', () => {
      const workshop = {title: 'lorem'};
      deferred.resolve(workshop);
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

// Stub - заглушка
// Mock - это stub, который имлпементирует упрощенную версию чего-то
// q.done вызывается в конце после всех then
