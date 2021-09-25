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
import { ContainerDesktop } from 'core/base';

export default function ApplicationDetail() {
  const { query } = useRouter();

  return (
    <div>
      <Head />
      <HeaderMenu />
      <ContainerDesktop>
        <HeaderNavigation title={query.applicationId as string} />
        <ApplicationDetailContent />
        <View style={styles.separator} />
        <DepositSection />
      </ContainerDesktop>
      <Footer />
    </div>
  );
}

const styles = StyleSheet.create({
  separator: {
    marginVertical: Token.spacing.xxl,
    borderBottomWidth: 4,
    borderBottomColor: Token.colors.rynaGray,
  },
});
