import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Token } from 'core';
import { Button, Text } from 'core/base';
import ProgressBar from '../Progress/Bar';
import Questionaire from '../Questionaire';

export default function PreferenceContent() {
  const { t } = useTranslation();
  return (
    <View>
      <Questionaire
        loading={false}
        question={{
          id: 1,
          question_text: `Where do you want to move?`,
          type: 'choices',
          section: 'user_preferences',
          group_name: '',
          weight: 25,
          add_ons: {
            choices: ['toronto', 'canada'],
          },
        }}
      />
      <View style={styles.footer}>
        <Text variant="caption" ink="dark" style={styles.caption}>
          {t('completeness')}
        </Text>
        <ProgressBar
          progress={0.2}
          width={200}
          color={Token.colors.rynaBlue}
          unfilledColor={'rgba(28,43,79,0.24)'} // Token.colors.rynaBlue with opacity
          style={{ alignSelf: 'center' }}
        />
        <View style={styles.actionWrapper}>
          <Button
            variant="outline"
            IconStart="arrow-up"
            borderColor={Token.colors.rynaBlue}
            disabled
            style={styles.button}
          />
          <Button
            variant="outline"
            IconStart="arrow-down"
            borderColor={Token.colors.rynaBlue}
            style={styles.button}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Token.spacing.xxl,
  },
  caption: {
    marginRight: Token.spacing.xs,
  },
  actionWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    alignSelf: 'flex-start',
    minWidth: 'unset',
    paddingHorizontal: 0,
    paddingVertical: Token.spacing.s,
    marginHorizontal: Token.spacing.xs,
  },
});
