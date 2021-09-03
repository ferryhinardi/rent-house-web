import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
// @ts-ignore
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import htmr from 'htmr';
import { Token } from 'core';
import { Text, Badge, Button, Modal } from 'core/base';
import DepositModalContent from './DepositModalContent';

export default function DepositSection() {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text variant="header-3" style={styles.title}>
          {t('depositSectionTitle')}
        </Text>
        <Badge variant="alert" text={t('depositIncomplete')} />
      </View>
      <Text variant="caption">{t('depositSectionDescription')}</Text>

      <DepositCard />
    </View>
  );
}

function DepositCard() {
  const { t } = useTranslation();
  const [isVisible, onVisible] = React.useState(false);
  return (
    <View style={styles.depositCardContainer}>
      <View style={styles.depositCardWrapper}>
        <Icon name="credit-card" size={24} />
        <View style={styles.depositCardHead}>
          <Text ink="dark">{t('paydeposit')}</Text>
          <Text variant="small" ink="dark" style={styles.depositPlaceholder}>
            {htmr(t('placeholderPayDeposit'))}
          </Text>
        </View>
      </View>
      <Button
        variant="secondary"
        text={t('paydepositButton')}
        onPress={() => onVisible(true)}
      />
      <Modal
        animationType="fade"
        visible={isVisible}
        onRequestClose={() => onVisible(false)}
        noPadding
      >
        <Button
          IconStart="times"
          variant="empty"
          style={styles.close}
          onPress={() => onVisible(false)}
        />
        <DepositModalContent />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: Token.spacing.xxl,
  },
  header: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginBottom: Token.spacing.xs,
  },
  title: { marginRight: Token.spacing.m },
  depositCardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    backgroundColor: Token.colors.frame,
    marginVertical: Token.spacing.xxl,
    padding: Token.spacing.m,
  },
  depositCardWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  depositCardHead: {
    marginLeft: Token.spacing.ml,
  },
  depositPlaceholder: {
    marginTop: Token.spacing.s,
  },
  close: { minWidth: 0, position: 'absolute', right: 0, zIndex: 1 },
});
