import React from 'react';
import { Text as RNText, TextProps } from 'react-native';

interface Props extends TextProps {
  children: string;
}

function Text(props: Props) {
  return (
    <RNText {...props} />
  );
}

export default Text;
