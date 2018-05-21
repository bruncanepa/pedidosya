export const isNullOrEmpty = function(value) {
  const valueTrimed = value && value.trim();
  return !valueTrimed;
};

export const shouldRender = function({ propsToCheck, statesToCheck, props, state, nextProps, nextState }) {
  let propsChanged = false;

  if (propsToCheck) {
    propsChanged = propsToCheck.some(function(prop) {
      return props[prop] != nextProps[prop];
    });
  }

  if (!propsChanged && statesToCheck) {
    return statesToCheck.some(function(prop) {
      return state[prop] != nextState[prop];
    });
  }

  return propsChanged;
};


export default {
  isNullOrEmpty,
  shouldRender
};