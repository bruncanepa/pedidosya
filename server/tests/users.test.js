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

describe('Users API', () => {
  beforeEach(done => { 
    helpers.signOutRequest((err, res) => done());
  })

  describe('getUser', () => {
    it('it should get the user', (done) => {
      const intercept = interceptors.getUserSuccessful();
      chai.request(server)
        .get('/api/users')
        .set(config.AUTHORIZATION_HEADER, access_token)
        .end((err, res) =>{
          helpers.expectSuccess({err, res, interceptors: intercept});
          expect(res.body.data.user).to.be.not.null;
          expect(res.body.data.user.id).to.be.eq(user.id);
          done();
        })
    });

    it('it should not get the user - invalid token', (done) => {
      const intercept = interceptors.getUserError();
      chai.request(server)
        .get('/api/users')
        .set(config.AUTHORIZATION_HEADER, access_token)
        .end((err, res) => {
          helpers.expectError({err, res, interceptors: intercept});
          done();
        });
    });
  })
});