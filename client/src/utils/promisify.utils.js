export default function (callback) {
  return function () {
    return Promise.resolve(callback());
  };
};