const item = 'userSession';

const loadState = () => {
  try {
    const serializedState = localStorage.getItem(item);
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (error) {
    return undefined;
  }
};

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(item, serializedState);
  } catch (error) {
    // Do nothing
  }
};

const removeState = () => {
  try {
    localStorage.removeItem(item);
  } catch (error) {
    // Do nothing
  }
};

export default {
  loadState,
  saveState,
  removeState
};