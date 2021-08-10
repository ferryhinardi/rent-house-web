import React from 'react';
import { View, StyleSheet, ViewProps } from 'react-native';

type Props = {
  children: React.ReactNode;
  style?: ViewProps['style'];
};

const styles = StyleSheet.create({
  container: { width: 1024, margin: 'auto', zIndex: -1 },
});

function ContainerDesktop({ children, style }: Props) {
  return <View style={[styles.container, style]}>{children}</View>;
}

export default ContainerDesktop;
