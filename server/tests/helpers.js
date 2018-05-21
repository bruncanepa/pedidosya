const chai = require('chai');
const expect = chai.expect;
const should = chai.should();

const config = require('../src/config');
const server = require('../src/api');
const {user, username, password, access_token} = require('./values');

const signOutRequest = (callback) => {
  chai.request(server)
    .del('/api/session')
    .set(config.AUTHORIZATION_HEADER, access_token)
    .set(config.USER_ID_HEADER, user.id)
    .end(callback);
};

const signInSuccessfulRequest = ({done, interceptors = []}) => {
  return new Promise((resolve) => {
    chai
      .request(server)
      .post('/api/session')
      .send({password, username})
      .end((err, res) => {
        interceptorsAreDone({interceptors});
        expect(err).to.be.null;
        expect(res).to.not.be.null;
        res.should.have.status(200);
        expect(res.body).to.be.not.null;
        expect(res.body.success).to.be.true;
        expect(res.body.data).to.be.not.null;
        expect(res.body.data.sessionToken).to.be.eq(access_token);
        resolve(done && done());
      });
  });
};

const interceptorsAreDone = ({interceptors = []}) => {
  interceptors.forEach(interceptor => {
    expect(interceptor.isDone()).to.be.true;
  });
};

module.exports = {
  signOutRequest,
  signInSuccessfulRequest,
  interceptorsAreDone
};