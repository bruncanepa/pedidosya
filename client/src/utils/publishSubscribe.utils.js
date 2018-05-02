import promisify from './promisify.utils';

const subscribers = {};

function Subscriber() {
  this.observers = {};
  this.id = 0;
}

Subscriber.prototype.subscribe = function (callback) {
  this.observers[++this.id] = promisify(callback);
  const id = this.id;
  return function () {
    this.unsubscribe(id);
  }
};

Subscriber.prototype.publish = function (payload) {
  const observers = this.observers;
  Object
    .keys(observers)
    .forEach(function (key) {
      observers[key](payload);
    });
};

Subscriber.prototype.unsubscribe = function (id) {
  delete this.observers[id];
};

export const subscribe = function (event, callback) {
  let subscriber = subscribers[event];
  if (!subscriber) {
    subscriber = new Subscriber();
    subscribers[event] = subscriber;
  }
  return subscriber.subscribe(callback);
};

export const publish = function (event, payload) {
  const subscriber = subscribers[event];
  if (subscriber) {
    subscriber.publish(payload);
  }
};

export const events = {
  SIGN_IN: 'SIGN_IN',
  SING_OUT: 'SING_OUT'
};

export default {
  subscribe,
  publish,
  events
};