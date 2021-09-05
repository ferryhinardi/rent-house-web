import React from 'react';
import { View, StyleSheet, ViewProps } from 'react-native';
import { Token } from 'core';

type Props = {
  children: React.ReactNode;
  style?: ViewProps['style'];
};

const styles = StyleSheet.create({
  container: { paddingHorizontal: Token.spacing.xxxxl },
});

function ContainerDesktop({ children, style }: Props) {
  return <View style={[styles.container, style]}>{children}</View>;
}

export default ContainerDesktop;
