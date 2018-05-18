export const SESSION_KEY = 'userSession';
export const USER_ID_KEY = 'userId';

const loadState = (item = SESSION_KEY) => {
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

const saveState = (state, item = SESSION_KEY) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(item, serializedState);
  } catch (error) {
    // Do nothing
  }
};

const removeState = (item = SESSION_KEY) => {
  try {
    localStorage.removeItem(item);
  } catch (error) {
    // Do nothing
  }
};

export default {
  loadState,
  saveState,
  removeState,
  SESSION_KEY,
  USER_ID_KEY
};