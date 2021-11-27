import React, { useRef } from 'react';
import { StyleSheet, Modal as RNModal, View, ScrollView, ViewStyle } from 'react-native';

import { useClickOutside } from 'core/hooks';

import { spacing, colors, border } from './Token';

type Props = React.ComponentProps<typeof RNModal> & {
  children: React.ReactNode;
  noPadding?: boolean;
  modalContentStyle?: ViewStyle;
};

export default function Modal({ children, onDismiss, noPadding, modalContentStyle, ...restProps }: Props) {
  const modalContent = useRef<View>();

  useClickOutside(modalContent as any, () => {
    onDismiss && onDismiss();
  });

  const paddingContent = noPadding ? {} : { padding: spacing.m };
  return (
    <RNModal {...restProps} transparent onDismiss={onDismiss}>
      <View style={styles.container}>
        <View style={styles.modalOverlay} />
        <ScrollView showsHorizontalScrollIndicator={false}>
          <View
            ref={(ref) => {
              modalContent.current = ref as View;
            }}
            style={[styles.modalContent, paddingContent, modalContentStyle]}>
            {children}
          </View>
        </ScrollView>
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
