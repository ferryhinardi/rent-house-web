import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Token } from 'core';

type Props = {
  children: React.ReactNode;
};

export const MinRange = 0;
export const MaxRange = 3500;

const SliderContext = React.createContext<{ min?: number; max?: number }>({
  min: MinRange,
  max: MaxRange,
});

export const SliderConsumer = SliderContext.Consumer;

function ContainerSlider({ children }: Props) {
  const [min] = React.useState<number>(MinRange);
  const [max] = React.useState<number>(MaxRange);

  return (
    <SliderContext.Provider value={{ min, max }}>
      <View style={styles.container}>
        <View style={styles.children}>{children}</View>
      </View>
    </SliderContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  children: { flex: 1, paddingHorizontal: Token.spacing.xs },
});

export default ContainerSlider;
