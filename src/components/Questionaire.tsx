import React from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { Token } from 'core';

function Questionaire() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{'Start Here'}</Text>
      <Text style={styles.subtitle}>{'Where do you want to move?'}</Text>
      <TextInput placeholder="name 1" style={styles.textInput} />
      <TextInput placeholder="name 2" style={styles.textInput} />
      <TextInput placeholder="name 3" style={styles.textInput} />
      <TextInput placeholder="name 4" style={styles.textInput} />
      <Pressable style={styles.submitButton}>
        <Text style={styles.submitText}>{'Find My Home'}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Token.colors.white,
    borderTopLeftRadius: 60,
    borderBottomRightRadius: 60,
    borderWidth: Token.border.width.bold,
    borderColor: Token.colors.gold,
    padding: Token.spacing.xxxxxl,
    alignSelf: 'flex-start'
  },
  title: {
    fontSize: Token.fontSize.huge,
    lineHeight: 36,
    fontWeight: "400",
  },
  subtitle: {
    fontSize: Token.fontSize.big,
    lineHeight: 28,
    marginVertical: Token.spacing.s,
  },
  textInput: {
    paddingHorizontal: Token.spacing.m,
    paddingVertical: Token.spacing.s,
    marginTop: Token.spacing.l,
    borderWidth: Token.border.width.thick,
    borderColor: Token.colors.blue,
  },
  submitButton: {
    marginTop: Token.spacing.xl,
    paddingVertical: Token.spacing.m,
    borderTopLeftRadius: Token.spacing.xs,
    borderBottomRightRadius: Token.spacing.xs,
    backgroundColor: Token.colors.blue,
    alignItems: 'center',
  },
  submitText: {
    color: Token.colors.white,
  },
});

export default Questionaire;
