const chai = require('chai');
const chaiHttp = require('chai-http');

const should = chai.should();
const expect = chai.expect;
chai.use(chaiHttp);

const server = require('../src/api');
const config = require('../src/config');
const {user, username, password, access_token} = require('./values');
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
          helpers.interceptorsAreDone({interceptors: intercept});
          expect(err).to.be.null;
          expect(res).to.not.be.null;
          res.should.have.status(200);
          expect(res.body).to.be.not.null;
          expect(res.body.success).to.be.true;
          expect(res.body.data).to.be.not.null;
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
          helpers.interceptorsAreDone({interceptors: intercept});
          expect(err).to.be.null;
          expect(res).to.not.be.null;
          res.should.have.status(401);
          expect(res.body).to.be.not.null;
          expect(res.body.success).to.be.false;
          expect(res.body.data).to.be.not.undefined;
          done();
        });
    });
  })
});