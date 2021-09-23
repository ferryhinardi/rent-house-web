import React from 'react';
import { View, StyleSheet } from 'react-native';

import { spacing } from './Token';
import Text from './Text';

export type Props = {
  text: string;
  errorMessageId?: string;
};

export default function ErrorMessage(props: Props) {
  return (
    <View nativeID={props.errorMessageId} style={styles.container}>
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
