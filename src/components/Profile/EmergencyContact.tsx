import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Controller, useFormContext, useFieldArray } from 'react-hook-form';
import { Token } from 'core';
import { Text, Button, Input, ErrorMessage } from 'core/base';

export default function EmergencyContact() {
  const { t } = useTranslation();
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    name: 'emergencyContacts',
    control,
  });
  const onAddContact = () => {
    append({ name: '', relationship: '', email: '', phone: '' });
  };
  const onDeleteContact = (index: number) => {
    remove(index);
  };

  return (
    <View>
      <Text variant="header-3">{t('emergencyContact')}</Text>
      {fields.map((field, index) => (
        <View key={field.id} style={styles.formContact}>
          <Controller
            name={`emergencyContacts.${index}.name`}
            control={control}
            rules={{
              required: t('emergencyName.required') as string,
            }}
            render={({ field, fieldState }) => (
              <View style={styles.formGroup}>
                <Text variant="tiny" style={styles.label}>
                  {t('emergencyName')}
                </Text>
                <Input
                  {...field}
                  placeholder={t('emergencyName')}
                  textContentType="name"
                  error={Boolean(fieldState.error)}
                  errorMessageId={fieldState.error?.message}
                />
                {Boolean(fieldState.error) && (
                  <ErrorMessage text={fieldState.error?.message!} errorMessageId={fieldState.error?.message} />
                )}
              </View>
            )}
          />
          <Controller
            name={`emergencyContacts.${index}.relationship`}
            control={control}
            rules={{
              required: t('emergencyRelationship.required') as string,
            }}
            render={({ field, fieldState }) => (
              <View style={styles.formGroup}>
                <Text variant="tiny" style={styles.label}>
                  {t('emergencyRelationship')}
                </Text>
                <Input
                  {...field}
                  placeholder={t('emergencyRelationship')}
                  textContentType="name"
                  error={Boolean(fieldState.error)}
                  errorMessageId={fieldState.error?.message}
                />
                {Boolean(fieldState.error) && (
                  <ErrorMessage text={fieldState.error?.message!} errorMessageId={fieldState.error?.message} />
                )}
              </View>
            )}
          />
          <Controller
            name={`emergencyContacts.${index}.email`}
            control={control}
            rules={{
              required: t('emergencyEmail.required') as string,
            }}
            render={({ field, fieldState }) => (
              <View style={styles.formGroup}>
                <Text variant="tiny" style={styles.label}>
                  {t('emergencyEmail')}
                </Text>
                <Input
                  {...field}
                  placeholder={t('emergencyEmail')}
                  textContentType="name"
                  error={Boolean(fieldState.error)}
                  errorMessageId={fieldState.error?.message}
                />
                {Boolean(fieldState.error) && (
                  <ErrorMessage text={fieldState.error?.message!} errorMessageId={fieldState.error?.message} />
                )}
              </View>
            )}
          />
          <Controller
            name={`emergencyContacts.${index}.phone`}
            control={control}
            rules={{
              required: t('emergencyPhone.required') as string,
            }}
            render={({ field, fieldState }) => (
              <View style={styles.formGroup}>
                <Text variant="tiny" style={styles.label}>
                  {t('emergencyPhone')}
                </Text>
                <Input
                  {...field}
                  placeholder={t('emergencyPhone')}
                  textContentType="name"
                  error={Boolean(fieldState.error)}
                  errorMessageId={fieldState.error?.message}
                />
                {Boolean(fieldState.error) && (
                  <ErrorMessage text={fieldState.error?.message!} errorMessageId={fieldState.error?.message} />
                )}
              </View>
            )}
          />
          <Button
            variant="empty"
            IconStart="trash"
            text={t('deleteContact')}
            style={styles.deleteContact}
            onPress={() => onDeleteContact(index)}
          />
        </View>
      ))}
      <View style={{ marginTop: Token.spacing.l, marginBottom: Token.spacing.xxl, alignItems: 'flex-start' }}>
        <Button variant="secondary" text={t('addContact')} onPress={onAddContact} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  formContact: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Token.spacing.xxl,
    backgroundColor: Token.colors.frame,
    borderRadius: Token.border.radius.default,
    marginTop: Token.spacing.l,
    paddingHorizontal: Token.spacing.l,
    paddingTop: Token.spacing.l,
    paddingBottom: Token.spacing.xxm,
  },
  formGroup: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: '48%',
  },
  deleteContact: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: '100%',
    justifyContent: 'flex-start',
  },
  label: {
    marginBottom: Token.spacing.xs,
  },
});
