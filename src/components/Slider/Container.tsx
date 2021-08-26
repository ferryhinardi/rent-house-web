import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Input } from 'core/base';
import { Token } from 'core';

type Props = {
  children: React.ReactNode;
};

export const MinRange = 0;
export const MaxRange = 1800;

const SliderContext = React.createContext<{ min?: number; max?: number }>({
  min: MinRange,
  max: MaxRange,
});
export const SliderConsumer = SliderContext.Consumer;

function ContainerSlider({ children }: Props) {
  const [min, setMin] = React.useState<number>(MinRange);
  const [max, setMax] = React.useState<number>(MaxRange);

  return (
    <SliderContext.Provider value={{ min, max }}>
      <View style={styles.container}>
        <Input
          placeholder="min"
          containerStyle={styles.input}
          keyboardType="numeric"
          onChangeText={(text) => setMin(Number(text))}
        />
        <View style={styles.children}>{children}</View>
        <Input
          placeholder="max"
          containerStyle={styles.input}
          keyboardType="numeric"
          onChangeText={(text) => setMax(Number(text))}
        />
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
  input: { width: '15%' },
});

export default ContainerSlider;
