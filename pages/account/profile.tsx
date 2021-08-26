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

export default function Profile() {
  const { t } = useTranslation();
  return (
    <div>
      <Head />
      <HeaderMenu />
      <View style={styles.container}>
        <HeaderNavigation title={t('profile')} />
        <PersonalInfoForm />
        <View style={styles.separator} />
        <EmergencyContact />
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
