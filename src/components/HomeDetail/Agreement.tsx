import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { Token } from 'core';
import { Text, Button, Modal } from 'core/base';
import { routePaths } from 'routePaths';

export default function Agreement() {
  const [isVisible, onVisible] = React.useState(false);
  const { t } = useTranslation();
  const onApplyNow = () => {
    // TODO: this should be apply now action

    onVisible(true);
  };
  return (
    <View style={styles.container}>
      <View style={styles.agreementLetter} />
      <Button
        text={t('applyNow')}
        onPress={onApplyNow}
        style={styles.submitButton}
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
        <ConfirmApplyModal />
      </Modal>
    </View>
  );
}

function ConfirmApplyModal() {
  const { t } = useTranslation();
  const router = useRouter();
  const onSubmitConfirm = () => {
    router.replace({
      pathname: routePaths.applicationDetail,
      query: { applicationId: 'application.id' },
    });
  };
  return (
    <View style={styles.modalContainer}>
      <Text variant="header-2" ink="primary">
        {t('confirmApplyTitle')}
      </Text>
      <Text variant="caption" ink="primary" style={styles.subtitle}>
        {t('confirmApplySubtitle')}
      </Text>
      <Text variant="caption" ink="primary" style={styles.content}>
        {t('confirmApplyContent')}
      </Text>
      <Button text={t('confirmApplyActionLabel')} onPress={onSubmitConfirm} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: Token.spacing.xxxxl,
  },
  agreementLetter: {
    marginVertical: Token.spacing.xxxxl,
    backgroundColor: Token.colors.frame,
    width: '100%',
    height: 868,
  },
  submitButton: {
    minWidth: 300,
    marginBottom: Token.spacing.xxxxl,
    alignSelf: 'center',
  },
  modalContainer: {
    width: 600,
    margin: 'auto',
    padding: Token.spacing.l,
    alignItems: 'center',
  },
  close: { minWidth: 0, position: 'absolute', right: 0, zIndex: 1 },
  subtitle: {
    marginTop: Token.spacing.xxs,
  },
  content: {
    marginVertical: Token.spacing.xl,
  },
});
