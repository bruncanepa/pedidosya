const chai = require('chai');
const chaiHttp = require('chai-http');

const should = chai.should();
const expect = chai.expect;
chai.use(chaiHttp);

const server = require('../src/api');
const config = require('../src/config');
const {user, access_token, restaurants} = require('./values');
const interceptors = require('./interceptors');
const helpers = require('./helpers');

describe('Restaurants API', () => {
  const latitude = '-34.905';
  const longitude = '-56.181';

  before(done => {
    chai.request(server)
      .put('/api/administration')
      .set(config.AUTHORIZATION_HEADER, access_token)
      .set(config.USER_ID_HEADER, user.id)
      .send({time: 1})
      .end((err,res) => done())
  })

  beforeEach(done => { 
    helpers.signOutRequest((err, res) => 
      helpers.signInSuccessRequest({done, interceptors: interceptors.signInSuccess()})
    );
  })

  describe('getRestaurants', () => {
    it('it should get restaurants', (done) => {
      const intercept = interceptors.getRestaurantsSuccess({latitude, longitude});
      chai.request(server)
        .get(`/api/restaurants?lat=${latitude}&lng=${longitude}`)
        .set(config.AUTHORIZATION_HEADER, access_token)
        .set(config.USER_ID_HEADER, user.id)
        .end((err, res) =>{
          helpers.expectSuccess({err, res, interceptors: intercept});
          expect(res.body.data.restaurants).to.be.not.null;
          expect(res.body.data.restaurants).to.be.instanceOf(Array);
          expect(res.body.data.restaurants.length).to.be.eq(restaurants.length);
          done();
        })
    });

    it('it should not get restaurants - invalid userId', (done) => {
      chai.request(server)
        .get(`/api/restaurants?lat=${latitude}&lng=${longitude}`)
        .set(config.AUTHORIZATION_HEADER, access_token)
        .set(config.USER_ID_HEADER, 'invalid_user_id')
        .end((err, res) => {
          helpers.expectError({err, res})
          done();
        });
    });

    it('it should not get restaurants - invalid token', (done) => {
      chai.request(server)
        .get(`/api/restaurants?lat=${latitude}&lng=${longitude}`)
        .set(config.AUTHORIZATION_HEADER, 'invalid_access_token')
        .set(config.USER_ID_HEADER, user.id)
        .end((err, res) => {
          helpers.expectError({err, res})
          done();
        });
    });
  })

  describe('getRestaurantImage', () => {
    const image = restaurants[0].logo;

    it('it should get restaurant image', (done) => {
      const intercept = interceptors.getRestaurantImageSuccess({image});
      chai.request(server)
        .get(`/api/restaurants/image/${image}`)
        .set(config.AUTHORIZATION_HEADER, access_token)
        .set(config.USER_ID_HEADER, user.id)
        .end((err, res) => {
          helpers.interceptorsAreDone({interceptors: intercept});
          res.should.have.status(200);
          done();
        })
    });

    it('it should not get restaurant image - invalid userId', (done) => {
      chai.request(server)
        .get(`/api/restaurants/image/${image}`)
        .set(config.AUTHORIZATION_HEADER, access_token)
        .set(config.USER_ID_HEADER, 'invalid_user_id')
        .end((err, res) => {
          helpers.expectError({err, res})
          done();
        });
    });

    it('it should not get restaurant image - invalid token', (done) => {
      chai.request(server)
        .get(`/api/restaurants/image/${image}`)
        .set(config.AUTHORIZATION_HEADER, 'invalid_access_token')
        .set(config.USER_ID_HEADER, user.id)
        .end((err, res) => {
          helpers.expectError({err, res})
          done();
        });
    });
  })
});