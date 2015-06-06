var supertest = require('supertest');

describe('Trails Editor Server REST API Tests', function () {

  var agent;

  before(function (done) {
    require('../lib/server')(function (server) {
      agent = supertest.agent(server);
      done();
    })
  });

  describe('GET all existing trails', function (done) {
//    agent.get('/trails/').expect(200, done);
  });

  describe('POST create a new trail', function (done) {
    var request = {
      motor_vehicles: "yes",
      foot: "yes",
      bicycle: "yes",
      horse: "yes",
      ski: "yes",
      wheelchair: "yes",
      geometry: "{geometry: 1234.5678}"
    };
    agent.post('/trails/').send(request).expect(200, done);
  });

  describe('PUT update an existing trail', function (done) {

  });

  describe('DELETE an existing trail', function (done) {

  });

});