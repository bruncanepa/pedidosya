const chai = require('chai');
const chaiHttp = require('chai-http');

const should = chai.should();
const expect = chai.expect;
chai.use(chaiHttp);

const server = require('../src/api');
const config = require('../src/config');
const {user, access_token} = require('./values');
const interceptors = require('./interceptors');
const helpers = require('./helpers');

describe('Administration API', () => {
  beforeEach(done => { 
    helpers.signOutRequest((err, res) => 
      helpers.signInSuccessRequest({done, interceptors: interceptors.signInSuccess()})
    );
  })

  describe('setRestaurantsCacheTime', () => {
    const time = 1;
    it('it should set restaurants cache time', (done) => {
      chai.request(server)
        .put('/api/administration')
        .set(config.AUTHORIZATION_HEADER, access_token)
        .set(config.USER_ID_HEADER, user.id)
        .send({time})
        .end((err, res) =>{
          helpers.expectSuccess({err, res});
          expect(res.body.data.time).to.be.eq(time);
          done();
        })
    });

    it('it should not set restaurants cache time - invalid userId', (done) => {
      chai.request(server)
        .put('/api/administration')
        .set(config.AUTHORIZATION_HEADER, access_token)
        .set(config.USER_ID_HEADER, 'invalid_user_id')
        .send({time})
        .end((err, res) => {
          helpers.expectError({err, res});
          done();
        });
    });

    it('it should not set restaurants cache time - invalid token', (done) => {
      chai.request(server)
        .put('/api/administration')
        .set(config.AUTHORIZATION_HEADER, 'invalid_access_token')
        .set(config.USER_ID_HEADER, user.id)
        .send({time})
        .end((err, res) => {
          helpers.expectError({err, res});
          done();
        });
    });
  })

  describe('getAdministrationInfo', () => {
    it('it should get administration info', (done) => {
      chai.request(server)
        .get('/api/administration')
        .set(config.AUTHORIZATION_HEADER, access_token)
        .set(config.USER_ID_HEADER, user.id)
        .end((err, res) => {
          helpers.expectSuccess({err, res});
          expect(res.body.data.onlineUsers).to.be.not.null;
          expect(res.body.data.onlineUsers).to.be.instanceOf(Object);
          expect(res.body.data.onlineUsers.count).to.be.greaterThan(0);
          expect(res.body.data.searches).to.be.not.null;
          expect(res.body.data.searches).to.be.instanceof(Object);
          expect(res.body.data.searches.last).to.be.instanceof(Array);
          done();
        })
    });

    it('it should not get administration info - invalid userId', (done) => {
      chai.request(server)
        .get('/api/administration')
        .set(config.AUTHORIZATION_HEADER, access_token)
        .set(config.USER_ID_HEADER, 'invalid_user_id')
        .end((err, res) => {
          helpers.expectError({err, res});
          done();
        });
    });

    it('it should not get administration info - invalid token', (done) => {
      chai.request(server)
        .get('/api/administration')
        .set(config.AUTHORIZATION_HEADER, 'invalid_access_token')
        .set(config.USER_ID_HEADER, user.id)
        .end((err, res) => {
          helpers.expectError({err, res});
          done();
        });
    });
  })
});