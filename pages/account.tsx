import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import htmr from 'htmr';
import {
  Head,
  HeaderMenu,
  HeaderNavigation,
  SideBar,
  AccountBasicProfile,
  AccountSettings,
  AccountRecommendation,
  AccountLinkedAccounts,
  Footer,
} from 'components';
import { Token } from 'core';
import { Text } from 'core/base';

function Account() {
  const { t } = useTranslation();
  return (
    <div>
      <Head />
      <HeaderMenu />
      <View style={styles.container}>
        <HeaderNavigation title={t('account')} />
        <Text style={styles.description}>{htmr(t('accountDescription'))}</Text>
        <View style={styles.separator} />
        <View style={styles.contentWrapper}>
          <SideBar
            menus={[
              t('basicProfile'),
              t('accountSettings'),
              t('recommendation'),
              t('linkedAccounts'),
            ]}
          />
          <View style={styles.content}>
            <AccountBasicProfile />
            <View style={styles.separator} />
            <AccountSettings />
            <View style={styles.separator} />
            <AccountRecommendation />
            <View style={styles.separator} />
            <AccountLinkedAccounts />
          </View>
        </View>
      </View>
      <Footer />
    </div>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Token.spacing.xxxxl,
  },
  description: {
    marginTop: Token.spacing.xxl,
  },
  separator: {
    marginVertical: Token.spacing.xxl,
    borderBottomWidth: 4,
    borderBottomColor: Token.colors.rynaGray,
  },
  contentWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  content: {
    marginLeft: Token.spacing.xxl,
    marginBottom: Token.spacing.xxxxxl,
  },
});

export default Account;
