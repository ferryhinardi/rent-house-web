import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import {
  Head,
  HeaderMenu,
  HeaderNavigation,
  ApplicationContainer,
  ApplicationCard,
  Footer,
} from 'components';
import { Token } from 'core';
import { Text } from 'core/base';
import htmr from 'htmr';

export default function Application() {
  const { t } = useTranslation();
  const data = [1];
  return (
    <div>
      <Head />
      <HeaderMenu />
      <View style={styles.container}>
        <HeaderNavigation
          title={t('application')}
          subtitle={t('applicationDescription')}
        />
        {data.length === 0 ? (
          <>
            <View style={styles.contentWrapper}>
              <Text>{htmr(t('emptyApplicationPlaceholder'))}</Text>
            </View>
            <View style={styles.separator} />
          </>
        ) : (
          <ApplicationContainer>
            <ApplicationCard />
            <ApplicationCard />
            <ApplicationCard />
            <ApplicationCard />
            <ApplicationCard />
          </ApplicationContainer>
        )}
      </View>
      <Footer />
    </div>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Token.spacing.xxxxl,
  },
  separator: {
    marginVertical: Token.spacing.xxl,
    borderBottomWidth: 4,
    borderBottomColor: Token.colors.rynaGray,
  },
  contentWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: Token.spacing.xxl,
  },
});
