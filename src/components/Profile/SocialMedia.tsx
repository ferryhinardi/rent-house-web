import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useController, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Token } from 'core';
import { Text, Input, ErrorMessage } from 'core/base';

export default function SocialMedia() {
  const { control } = useFormContext();
  const { t } = useTranslation();
  const { field: fieldFacebook, fieldState: fieldStateFacebook } = useController({ name: 'facebook_url', control });
  const { field: fieldTwitter, fieldState: fieldStateTwitter } = useController({ name: 'twitter_url', control });
  const { field: fieldInstagram, fieldState: fieldStateInstagram } = useController({ name: 'instagram_url', control });
  return (
    <View>
      <Text variant="header-3">{t('socialMedia')}</Text>
      <View style={styles.formContainer}>
        <View style={styles.formGroup}>
          <Text variant="tiny" style={styles.label}>
            {t('facebook')}
          </Text>
          <Input
            {...fieldFacebook}
            placeholder={t('facebook')}
            textContentType="name"
            error={Boolean(fieldStateFacebook.error)}
            errorMessageId={fieldStateFacebook.error?.message}
          />
          {Boolean(fieldStateFacebook.error) && (
            <ErrorMessage
              text={fieldStateFacebook.error?.message!}
              errorMessageId={fieldStateFacebook.error?.message}
            />
          )}
        </View>
        <View style={styles.formGroup}>
          <Text variant="tiny" style={styles.label}>
            {t('twitter')}
          </Text>
          <Input
            {...fieldTwitter}
            placeholder={t('twitter')}
            textContentType="name"
            error={Boolean(fieldStateTwitter.error)}
            errorMessageId={fieldStateTwitter.error?.message}
          />
          {Boolean(fieldStateTwitter.error) && (
            <ErrorMessage text={fieldStateTwitter.error?.message!} errorMessageId={fieldStateTwitter.error?.message} />
          )}
        </View>
        <View style={styles.formGroup}>
          <Text variant="tiny" style={styles.label}>
            {t('instagram')}
          </Text>
          <Input
            {...fieldInstagram}
            placeholder={t('instagram')}
            textContentType="name"
            error={Boolean(fieldStateInstagram.error)}
            errorMessageId={fieldStateInstagram.error?.message}
          />
          {Boolean(fieldStateInstagram.error) && (
            <ErrorMessage
              text={fieldStateInstagram.error?.message!}
              errorMessageId={fieldStateInstagram.error?.message}
            />
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Token.spacing.xxl,
    marginTop: Token.spacing.xxl,
  },
  formGroup: {
    flexGrow: 0,
    flexShrink: 1,
    flexBasis: '48%',
  },

  label: {
    marginBottom: Token.spacing.xs,
  },
});
