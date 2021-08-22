import React from 'react';
import Image from 'next/image';
import { View, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Text, Button } from 'core/base';
import { Token } from 'core';
import avatar from 'assets/avatar-sample.svg';

export default function BasicProfile() {
  const { t } = useTranslation();
  return (
    <View style={styles.container}>
      <Text variant="header-title" ink="primary">
        {t('welcomeMessage', { name: 'username' })}
      </Text>
      <Text variant="medium-large">{t('welcomeDescription')}</Text>
      <View style={styles.form}>
        <View>
          <View style={{ borderRadius: Token.border.radius.default }}>
            <Image src={avatar} width={240} height={240} alt="avatar" />
          </View>
          <Button
            variant="secondary"
            text={t('reuploadButton')}
            style={styles.uploadButton}
          />
        </View>
        <View></View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  form: { marginTop: Token.spacing.xxl, flexDirection: 'row' },
  formGroup: {},
  uploadButton: {
    marginTop: Token.spacing.l,
  },
});
