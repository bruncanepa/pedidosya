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

const signInErrorEndHandler = ({done, interceptors = []}) => (err, res) => {
  helpers.expectError({err, res, interceptors});
  done();
};

describe('Session API', () => {
  beforeEach(done => { 
    helpers.signOutRequest((err, res) => done());
  })

  describe('signIn', () => {
    it('it should sign in', (done) => {
      helpers.signInSuccessfulRequest({done, interceptors: interceptors.signInSuccessful()});
    });

    it('it should not sign in - invalid password', (done) => {
      const data = {password, username: 'otherusername'};
      const intercept = interceptors.signInError(data);
      chai.request(server)
        .post('/api/session')
        .send(data)
        .end(signInErrorEndHandler({done, interceptors: intercept}));
    });

    it('it should not sign in - invalid username', (done) => {
      const data = {password, username: 'otherusername'};
      const intercept = interceptors.signInError(data);
      chai.request(server)
        .post('/api/session')
        .send(data)
        .end(signInErrorEndHandler({done, interceptors: intercept}));
    });
  })

  describe('signOut', () => {
    it('it should sign out', (done) => {
      helpers.signInSuccessfulRequest({interceptors: interceptors.signInSuccessful()})
        .then(() => {
          helpers.signOutRequest((err, res) => {
            helpers.expectSuccess({err, res});
            done();
          });
        });
    });
  })

});