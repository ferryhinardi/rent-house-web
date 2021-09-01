import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
// @ts-ignore
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { FormProvider, useForm } from 'react-hook-form';
import { scroller } from 'react-scroll';
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

export default function Account() {
  const { t } = useTranslation();
  const forms = useForm();

  const onPressMenu = (menuId: string) => {
    scroller.scrollTo(menuId, {
      duration: 500,
      delay: 100,
      smooth: true,
      offset: -50,
    });
  };

  return (
    <div>
      <Head />
      <HeaderMenu />
      <View style={styles.container}>
        <HeaderNavigation title={t('account')} />
        <View style={styles.separator} />
        <View style={styles.contentWrapper}>
          <SideBar
            menus={[
              {
                name: 'basic-profile',
                label: t('basicProfile'),
                IconRight: (
                  <Icon
                    name="check-circle"
                    size={20}
                    color={Token.colors.rynaBlue}
                  />
                ),
              },
              {
                name: 'account-settings',
                label: t('accountSettings'),
                IconRight: (
                  <Icon
                    name="exclamation-triangle"
                    size={20}
                    color={Token.colors.red}
                  />
                ),
              },
              {
                name: 'recommendation',
                label: t('recommendation'),
                IconRight: (
                  <Icon
                    name="exclamation-triangle"
                    size={20}
                    color={Token.colors.red}
                  />
                ),
              },
              {
                name: 'linked-accounts',
                label: t('linkedAccounts'),
                IconRight: (
                  <Icon
                    name="exclamation-triangle"
                    size={20}
                    color={Token.colors.red}
                  />
                ),
              },
            ]}
            onPress={onPressMenu}
            style={{ flex: 0.2, width: '20%' }}
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
  separator: {
    marginVertical: Token.spacing.xxl,
    borderBottomWidth: 4,
    borderBottomColor: Token.colors.rynaGray,
  },
  contentWrapper: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  content: {
    flex: 0.8,
    marginLeft: Token.spacing.xxl,
    marginBottom: Token.spacing.xxxxxl,
  },
});
