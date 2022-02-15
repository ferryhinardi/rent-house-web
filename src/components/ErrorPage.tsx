import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'core/base';

type Props = {
  onRetry?: () => void;
};

export default function ErrorPage({ onRetry }: Props) {
  return (
    <View style={styles.container}>
      <h1>Sorry, Please contact our customer support!</h1>

      <Button onPress={onRetry} text={'Retry'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
