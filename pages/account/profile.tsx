import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import {
  Head,
  HeaderMenu,
  HeaderNavigation,
  PersonalInfoForm,
  EmergencyContact,
  Footer,
} from 'components';
import { Token } from 'core';
import { ContainerDesktop } from 'core/base';

export default function Profile() {
  const { t } = useTranslation();
  return (
    <div>
      <Head />
      <HeaderMenu />
      <ContainerDesktop>
        <HeaderNavigation title={t('profile')} />
        <PersonalInfoForm />
        <View style={styles.separator} />
        <EmergencyContact />
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
