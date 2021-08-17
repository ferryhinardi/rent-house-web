import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
// @ts-ignore
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { Token } from 'core';
import { Text } from 'core/base';
import { User } from 'types';

type Props = User;

function UserLoginHeader(props: Props) {
  return (
    <View style={styles.container}>
      <Pressable style={styles.button}>
        <Icon name="bell" size={24} color={Token.colors.blue} />
      </Pressable>
      <Pressable style={styles.button}>
        <Icon name="user" size={24} color={Token.colors.blue} />
      </Pressable>
      <Pressable style={styles.button}>
        <Text style={styles.username}>{props.name}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  button: {
    padding: Token.spacing.m,
  },
  username: {
    color: Token.colors.blue,
  },
});

export default UserLoginHeader;
