import React from 'react';
import { useRouter } from 'next/router';
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
import { routePaths } from '../../src/routePaths';

export default function Application() {
  const router = useRouter();
  const { t } = useTranslation();
  const data = [1];
  const onNavigateApplicationDetail = () => {
    router.push({
      pathname: routePaths.applicationDetail,
      query: { applicationId: 'application.id' },
    });
  };

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
            <ApplicationCard onPress={onNavigateApplicationDetail} />
            <ApplicationCard onPress={onNavigateApplicationDetail} />
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
