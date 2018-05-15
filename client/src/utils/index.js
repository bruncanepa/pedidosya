import validatorUtil from './validator.utils';
import localStorageUtil from './localStorage.utils';
import publishSubscribeUtil from './publishSubscribe.utils';
import queryUtil from './query.utils';


export const validator = validatorUtil;
export const localStorage = localStorageUtil;
export const publishSubscribe = publishSubscribeUtil;
export const query = queryUtil;

export const formatString = function(value, ...args) {
  return value.replace(/{(\d+)}/g, (match, number) => {
    return args[number] !== undefined ?
      args[number] :
      '';
  });
};