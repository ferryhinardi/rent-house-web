import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
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
};

function HeroTimeline({ states }: Props) {
  return (
    <View style={styles.container}>
      <FlatList
        keyExtractor={(_, idx) => `${idx}`}
        horizontal
        data={states}
        renderItem={({ item }) => (
          <View style={styles.state}>
            {item.value
              ? <Icon name="check-circle" size={32} color={Token.colors.white} />
              : <Icon name="circle-thin" size={32} color={Token.colors.white} />
            }
            <View style={styles.stateInfo}>
              <Text variant="medium-large" ink="light" style={styles.stateName}>{item.name}</Text>
              {item.value && <Text variant="tiny" ink="light">{item.value}</Text>}
            </View>
          </View>
        )}
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
