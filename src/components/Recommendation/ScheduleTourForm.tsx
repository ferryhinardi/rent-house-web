import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Button, Text } from 'core/base';
import { Token } from 'core';

export default function ScheduleTourForm() {
  const { t } = useTranslation();
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <InputBorder label="Starts from" value="$1200 - $1500" />
        <InputBorder label="Availability" value="Ready" />
      </View>
      <Button variant="secondary" text={t('scheduleTourButton')} />
    </View>
  );
}

function InputBorder({ label, value }: { label: string; value: string }) {
  return (
    <Pressable style={styles.wrapperInputBorder}>
      <Text>{label}</Text>
      <Text>{value}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {},
  wrapper: {
    marginVertical: Token.spacing.xl,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Token.spacing.l,
  },
  wrapperInputBorder: {
    padding: Token.spacing.m,
    borderRadius: Token.border.radius.default,
    borderColor: Token.colors.rynaBlue,
    borderWidth: Token.border.width.thin,
    alignItems: 'flex-start',
  },
});
