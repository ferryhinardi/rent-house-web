import React from 'react';
import { useRouter } from 'next/router';
import { View, StyleSheet } from 'react-native';
import {
  Head,
  HeaderMenu,
  HeaderNavigation,
  ApplicationDetailContent,
  DepositSection,
  Footer,
} from 'components';
import { Token } from 'core';

export default function ApplicationDetail() {
  const { query } = useRouter();

  return (
    <div>
      <Head />
      <HeaderMenu />
      <View style={styles.container}>
        <HeaderNavigation title={query.applicationId as string} />
        <ApplicationDetailContent />
        <View style={styles.separator} />
        <DepositSection />
      </View>
      <Footer />
    </div>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Token.spacing.xxxxl,
  },
  separator: {
    marginVertical: Token.spacing.xxl,
    borderBottomWidth: 4,
    borderBottomColor: Token.colors.rynaGray,
  },
});
