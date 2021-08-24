import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { fetcher, Token } from 'core';
import { ContainerDesktop, Text, Button } from 'core/base';

export default function Testimonial() {
  const { t } = useTranslation();
  return (
    <ContainerDesktop>
      <FlatList
        keyExtractor={(_, idx) => `${idx}`}
        data={[0]}
        horizontal
        renderItem={() => {
          return (
            <View style={styles.itemWrapperStyle}>
              <Text variant="header-2">{t('titleTestimonial')}</Text>
              <Text variant="caption" style={styles.subtitle}>
                {t('subtitleTestimonial')}
              </Text>
              <Button
                variant="secondary"
                text={t('moreButtonTestimonial')}
                style={styles.moreButtton}
              />
            </View>
          );
        }}
        style={styles.container}
      />
    </ContainerDesktop>
  );
}

const styles = StyleSheet.create({
  container: { paddingVertical: Token.spacing.xxxxl },
  itemWrapperStyle: {
    paddingHorizontal: Token.spacing.l,
    alignSelf: 'flex-start',
  },
  subtitle: {
    marginTop: Token.spacing.m,
    marginBottom: Token.spacing.xxl,
  },
  moreButtton: {
    alignSelf: 'flex-start',
  },
});
