import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Token } from 'core';
import Input from 'core/base/Input';
import FacebookButton from 'components/FacebookButton';
import GoogleButton from 'components/GoogleButton';

function SignIn() {
  return (
    <View style={styles.container}>
      <Text style={styles.titleForm}>{'Sign In'}</Text>
      <Input
        placeholder="Email Address"
        textContentType="emailAddress"
        containerStyle={styles.input}
      />
      <Input
        placeholder="Password"
        textContentType="password"
        containerStyle={styles.input}
      />
      <Pressable style={styles.submitButton}>
        <Text style={styles.submitText}>{'Sign In'}</Text>
      </Pressable>

      <FacebookButton />
      <GoogleButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 768,
    margin: 'auto',
  },
  titleForm: {
    ...Token.typography.Baseline,
    fontSize: Token.fontSize.large,
  },
  input: {
    marginTop: Token.spacing.m,
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
    fontSize: Token.fontSize.large,
  },
});

export default SignIn;
