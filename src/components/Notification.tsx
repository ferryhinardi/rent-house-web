import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
// @ts-ignore
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { useTranslation } from 'react-i18next';
import { Token } from 'core';
import { Text, Pressable, Tooltip } from 'core/base';

export default function Notification() {
  const { t } = useTranslation();
  const [isVisibile, setIsVisible] = useState(false);

  return (
    <Tooltip
      show={isVisibile}
      position="bottom"
      width={200}
      content={
        <Text ink="light" style={{ textAlign: 'center' }}>
          {t('emptyNotification')}
        </Text>
      }
    >
      <Pressable
        style={styles.button}
        onPress={() => setIsVisible((prev) => !prev)}
      >
        <Icon name="bell" size={24} color={Token.colors.blue} />
      </Pressable>
    </Tooltip>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: Token.spacing.m,
  },
});
