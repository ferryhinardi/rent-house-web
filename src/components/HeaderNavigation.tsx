import React from 'react';
import { View, StyleSheet } from 'react-native';
import Router from 'next/router';
// @ts-ignore
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { Token } from 'core';
import { Text, Pressable } from 'core/base';
import Breadcrumb from 'components/Breadcrumb';

type Props = {
  withBack?: boolean;
  title: string;
  subtitle?: string;
  withBreadcrumb?: boolean;
};

export default function HeaderNavigation({ withBreadcrumb = true, withBack = true, title, subtitle }: Props) {
  return (
    <View>
      {withBreadcrumb && <Breadcrumb />}
      <View style={styles.header}>
        {withBack ? (
          <Pressable onPress={() => Router.back()}>
            <Icon name="arrow-left" size={24} />
          </Pressable>
        ) : null}
        <Text variant="header-3" style={styles.title}>
          {title}
        </Text>
      </View>
      {subtitle ? (
        <Text variant="caption" style={styles.subtitle}>
          {subtitle}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    marginLeft: Token.spacing.m,
  },
  subtitle: {
    marginTop: Token.spacing.m,
  },
});
