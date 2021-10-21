import React from 'react';
import { View, ViewProps, ViewStyle, StyleSheet } from 'react-native';

import { spacing } from './Token';
import Text from './Text';

export type Props = {
  text: string;
  errorMessageId?: string;
  containerStyle?: ViewProps<ViewStyle>;
};

export default function ErrorMessage(props: Props) {
  return (
    <View nativeID={props.errorMessageId} style={[styles.container, props.containerStyle]}>
      <Text variant="small" ink="alert" numberOfLines={3}>
        {props.text}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.xs,
  },
});
