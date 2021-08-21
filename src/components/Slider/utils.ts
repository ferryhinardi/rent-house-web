import { Animated } from 'react-native';

type ReturnValues = Animated.AnimatedValue[] | number[];

export const prepareValuesFromProps = (value: number | number[], maximumValue: number, minimumValue: number): ReturnValues => {
  const normalized = [];
  let arrayValue = Array.isArray(value) ? value : [value];

  for (let i = 0; i < arrayValue.length; i++) {
    let newValue = arrayValue[i];

    if (typeof newValue !== 'number') {
      newValue = i > 0 ? normalized[i - 1] : 0;
    }

    newValue = Math.max(Math.min(newValue, maximumValue), minimumValue);
    normalized.push(newValue);
  }

  return normalized;
};
