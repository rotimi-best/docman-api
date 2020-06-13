const request = require('supertest');
const app = require('./index');

describe('GET /order', function() {
  it('responds with json', function(done) {
    request(app)
      .get('/order')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});

describe('GET /repair', function() {
  it('responds with json', function(done) {
    request(app)
      .get('/repair')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});

describe('GET /expensis', function() {
  it('responds with json', function(done) {
    request(app)
      .get('/expensis')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});

describe('POST /order', function() {
  it('responds with json', function(done) {
    request(app)
      .post('/order')
      .send({
        date: new Date('05.13.2017'),
        startPoint: 'Харьков',
        destination: 'Львов',
        deliveryCost: '920',
        cargo: '50',
        weight: '30',
        distance: '296',
        price: '1200',
        fuelConsumption: '2601.59'
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });
});

describe('POST /repair', function() {
  it('responds with json', function(done) {
    request(app)
      .post('/repair')
      .send({
        startedAt: new Date('05.12.2017'),
        endedAt: new Date('05.13.2017'),
        repairPrice: 5489.67,
        equipementPrice: 2489.67,
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });
});

describe('POST /expensis', function() {
  it('responds with json', function(done) {
    request(app)
      .post('/expensis')
      .send({
        date: new Date('05.12.2017'),
        price: 2489.67,
        comment: 'Топливо'
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });
});