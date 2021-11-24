import React from 'react';
import { View, Pressable, FlatList, StyleSheet } from 'react-native';
// @ts-ignore
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { Token } from 'core';
import { Text } from 'core/base';
import useTailwind from 'hooks/useTailwind';

type State = {
  name: string;
  value?: string;
};

type Props = {
  states: State[];
  onChange?: (index: number) => void;
};

function HeroTimeline({ states, onChange }: Props) {
  const { md } = useTailwind();
  return (
    <View style={styles.container}>
      <FlatList
        keyExtractor={(_, idx) => `${idx}`}
        horizontal={!md}
        data={states}
        renderItem={({ item, index }) => {
          const PressWrapper = item.value ? Pressable : View;
          return (
            <PressWrapper style={styles.state} onPress={() => onChange?.(index)}>
              {item.value ? (
                <Icon name="check-circle" size={32} color={Token.colors.white} />
              ) : (
                <Icon name="circle-thin" size={32} color={Token.colors.white} />
              )}
              <View style={styles.stateInfo}>
                <Text variant="caption" ink="light" style={styles.stateName}>
                  {item.name}
                </Text>
                {item.value && (
                  <Text variant="small" ink="light">
                    {item.value}
                  </Text>
                )}
              </View>
            </PressWrapper>
          );
        }}
        ItemSeparatorComponent={() => (md ? <React.Fragment /> : <View style={styles.separator} />)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: Token.spacing.ml,
  },
  state: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stateInfo: {
    marginLeft: Token.spacing.xs,
  },
  stateName: {
    marginBottom: Token.spacing.xxs,
  },
  separator: {
    width: 30,
    alignSelf: 'center',
    marginHorizontal: Token.spacing.l,
    borderBottomWidth: Token.border.width.bold,
    borderBottomColor: Token.colors.white,
  },
});

export default HeroTimeline;
