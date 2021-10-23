export const parseUnixTime = (value: Date) => {
  if (value instanceof Date) {
    return Math.floor(value.getTime() / 1000);
  }
  return value;
};
