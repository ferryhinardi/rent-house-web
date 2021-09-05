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
import { ContainerDesktop } from 'core/base';

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
      <ContainerDesktop>
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
            style={styles.sidebar}
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
      </ContainerDesktop>
      <PreferenceBanner />
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
  contentWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Token.spacing.xxl,
    alignItems: 'flex-start',
  },
  sidebar: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: '18%',
  },
  content: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: '78%',
    marginBottom: Token.spacing.xxxxxl,
  },
});
