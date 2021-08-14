import React from 'react';
import { View, TextInput, Pressable, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Token } from 'core';
import { Text } from 'core/base';

function Questionaire() {
  const { t } = useTranslation();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('questionTitle')}</Text>
      <Text style={styles.subtitle}>{t('questionSubtitle')}</Text>
      <TextInput placeholder={t('placeholderQuestion1')} style={styles.textInput} />
      <TextInput placeholder={t('placeholderQuestion2')} style={styles.textInput} />
      <TextInput placeholder={t('placeholderQuestion3')} style={styles.textInput} />
      <TextInput placeholder={t('placeholderQuestion4')} style={styles.textInput} />
      <Pressable style={styles.submitButton}>
        <Text style={styles.submitText}>{t('submitQuestionButton')}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Token.colors.white,
    borderTopLeftRadius: 60,
    borderBottomRightRadius: 60,
    borderWidth: Token.border.width.bold,
    borderColor: Token.colors.gold,
    padding: Token.spacing.xxxxxl,
    alignSelf: 'flex-start'
  },
  title: {
    fontSize: Token.fontSize.huge,
    lineHeight: 36,
    fontWeight: "400",
  },
  subtitle: {
    fontSize: Token.fontSize.big,
    lineHeight: 28,
    marginVertical: Token.spacing.s,
  },
  textInput: {
    paddingHorizontal: Token.spacing.m,
    paddingVertical: Token.spacing.s,
    marginTop: Token.spacing.l,
    borderWidth: Token.border.width.thick,
    borderColor: Token.colors.blue,
  },
  submitButton: {
    marginTop: Token.spacing.xl,
    paddingVertical: Token.spacing.m,
    borderTopLeftRadius: Token.spacing.xs,
    borderBottomRightRadius: Token.spacing.xs,
    backgroundColor: Token.colors.blue,
    alignItems: 'center',
  },
  submitText: {
    color: Token.colors.white,
  },
});

export default Questionaire;
