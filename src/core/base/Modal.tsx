import React from 'react';
import { StyleSheet, Modal as RNModal, TouchableWithoutFeedback, View } from 'react-native';
import { spacing, colors, border } from './Token';

type Props = React.ComponentProps<typeof RNModal> & {
  children: React.ReactNode;
  noPadding?: boolean;
};

export default function Modal ({ children, onDismiss, noPadding, ...restProps }: Props) {
  const paddingContent = noPadding ? {} : { padding: spacing.m };
  return (
    <RNModal
      {...restProps}
      transparent
      onDismiss={onDismiss}
    >
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={onDismiss}>
          <View style={styles.modalOverlay} />
        </TouchableWithoutFeedback>
        <View style={[styles.modalContent, paddingContent]}>
          {children}
        </View>
      </View>
    </RNModal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  modalOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(28, 43, 79, 0.5)',
    backdropFilter: 'blur(24px)',
  },
  modalContent: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: colors.white,
    borderRadius: border.radius.default,
  },
});
