import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Head, HeaderMenu, HeaderNavigation } from 'components';
import { Token } from 'core';

function Account() {
  return (
    <div>
      <Head />
      <HeaderMenu />
      <View style={styles.container}>
        <HeaderNavigation title="Account" subtitle="subtitle" />
      </View>
    </div>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Token.spacing.xxxxl,
  },
});

export default Account;
