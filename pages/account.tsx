import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { FormProvider, useForm } from 'react-hook-form';
import { scroller } from 'react-scroll';
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
  PreferenceBanner,
  Footer,
} from 'components';
import { Token } from 'core';
import { Text } from 'core/base';

function Account() {
  const { t } = useTranslation();
  const forms = useForm();

  const onPressMenu = (menuId: string) => {
    scroller.scrollTo(menuId, {
      duration: 500,
      delay: 100,
      smooth: true,
    });
  };

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
              { name: 'basic-profile', label: t('basicProfile') },
              { name: 'account-settings', label: t('accountSettings') },
              { name: 'recommendation', label: t('recommendation') },
              { name: 'linked-accounts', label: t('linkedAccounts') },
            ]}
            onPress={onPressMenu}
            style={{ flex: 0.2 }}
          />
          <FormProvider {...forms}>
            <View style={styles.content}>
              <AccountBasicProfile />
              <View style={styles.separator} />
              <AccountSettings />
              <View style={styles.separator} />
              <AccountRecommendation />
              <View style={styles.separator} />
              <AccountLinkedAccounts />
            </View>
          </FormProvider>
        </View>
      </View>
      <PreferenceBanner />
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
    flex: 0.8,
    marginLeft: Token.spacing.xxl,
    marginBottom: Token.spacing.xxxxxl,
  },
});

export default Account;
