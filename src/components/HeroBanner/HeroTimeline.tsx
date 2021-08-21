import React from 'react';
import { View, Pressable, FlatList, StyleSheet } from 'react-native';
// @ts-ignore
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { Token } from 'core';
import { Text } from 'core/base';

type State = {
  name: string;
  value?: string;
};

type Props = {
  states: State[];
  onChange?: (index: number) => void;
};

function HeroTimeline({ states, onChange }: Props) {
  return (
    <View style={styles.container}>
      <FlatList
        keyExtractor={(_, idx) => `${idx}`}
        horizontal
        data={states}
        renderItem={({ item, index }) => {
          const PressWrapper = item.value ? Pressable : View;
          return (
            <PressWrapper
              style={styles.state}
              onPress={() => onChange?.(index)}
            >
              {item.value ? (
                <Icon
                  name="check-circle"
                  size={32}
                  color={Token.colors.white}
                />
              ) : (
                <Icon name="circle-thin" size={32} color={Token.colors.white} />
              )}
              <View style={styles.stateInfo}>
                <Text
                  variant="medium-large"
                  ink="light"
                  style={styles.stateName}
                >
                  {item.name}
                </Text>
                {item.value && (
                  <Text variant="tiny" ink="light">
                    {item.value}
                  </Text>
                )}
              </View>
            </PressWrapper>
          );
        }}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
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
    width: 56,
    alignSelf: 'center',
    marginHorizontal: Token.spacing.l,
    borderBottomWidth: Token.border.width.bold,
    borderBottomColor: Token.colors.white,
  },
});

export default HeroTimeline;
