export const isNullOrEmpty = (value) => {
  const valueTrimed = value && value.trim();
  return !!valueTrimed;
};

export default {
  isNullOrEmpty
};