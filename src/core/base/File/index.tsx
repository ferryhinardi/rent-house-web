import React, { useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import Uploady from '@rpldy/uploady';
import { asUploadButton, ButtonProps } from '@rpldy/upload-button';
// @ts-ignore
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { Token } from 'core';
import { Input, Text } from 'core/base';

type Props = React.ComponentProps<typeof Input>;

export default function File(props: Props) {
  const { t } = useTranslation();
  const buttonRef = useRef<React.FC<ButtonProps>>();

  if (!buttonRef.current) {
    buttonRef.current = asUploadButton(
      (buttonProps: ButtonProps & { onClick?: () => void }) => {
        return (
          <Input
            {...props}
            ref={buttonProps.ref}
            onFocus={() => buttonProps.onClick?.()}
            editable={false}
            iconRight={
              <View style={styles.placeholderButton}>
                <Icon name="upload" size={16} color={Token.colors.rynaBlack} />
                <Text
                  variant="small"
                  ink="dark"
                  style={styles.placeholderButtonText}
                >
                  {t('uploadPlaceholder')}
                </Text>
              </View>
            }
          />
        );
      }
    );
  }

  return (
    <Uploady destination={{ url: 'https://my-server/upload' }}>
      <buttonRef.current />
    </Uploady>
  );
}

const styles = StyleSheet.create({
  placeholderButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(57, 59, 67, 0.1)',
    shadowOffset: { width: 1, height: 4 },
    shadowRadius: 8,
    shadowColor: 'rgba(255, 255, 255, 0.04)',
    borderRadius: Token.border.radius.extra,
    paddingLeft: Token.spacing.m,
    paddingRight: Token.spacing.s,
    paddingVertical: Token.spacing.xs,
  },
  placeholderButtonText: {
    marginLeft: Token.spacing.s,
  },
});
