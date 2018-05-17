export const isNullOrEmpty = (value) => {
  const valueTrimed = value && value.trim();
  return !valueTrimed;
};

export const shouldRender = ({ propsToCheck, statesToCheck, props, state, nextProps, nextState }) => {
  let propsChanged = false;

  if (propsToCheck) {
      propsChanged = propsToCheck.some((prop) => {
          return props[prop] != nextProps[prop];
      });
  }

  if (!propsChanged && statesToCheck) {
      return statesToCheck.some((prop) => {
          return state[prop] != nextState[prop];
      });
  }

  return propsChanged;
};

export default {
  isNullOrEmpty,
  shouldRender
};