import React from 'react';
import { View, StyleSheet } from 'react-native';
import NoSSR from 'react-no-ssr';
import { Card, Badge, Text } from 'core/base';
import { Token } from 'core';
import { ApplicationData } from 'types';
import useTailwind from 'hooks/useTailwind';

type Props = {
  application: ApplicationData;
  onPress?: () => void;
};

export default function ApplicationCard({ application, onPress }: Props) {
  var badgeText = 'Deposit Incomplete';
  var variant: 'info' | 'alert' | 'neutral' = 'info';
  switch (application.status) {
    case 'submitted':
      badgeText = 'Deposit Incomplete';
      variant = 'alert';
      break;
    case 'approved':
      badgeText = 'Approved';
      variant = 'info';
      break;
    case 'completed':
      badgeText = 'Completed';
      variant = 'info';
      break;
    case 'canceled':
      badgeText = 'Canceled';
      variant = 'neutral';
      break;
  }

  var formatter = new Intl.DateTimeFormat('default', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Card style={styles.cardContainer} onPress={onPress}>
      <Card.Body>
        <Badge text={badgeText} variant={variant} align="flex-start" />
        <Text ink="dark" variant="header-4" style={styles.title}>
          {application.house.name}
        </Text>
        <Text>{application.city}</Text>
        <Text style={styles.amount}>{application.budget}</Text>
        <Text>{`Moving Date: ${formatter.format(Date.parse(application.moving_date))}`}</Text>
      </Card.Body>
    </Card>
  );
}

export function ApplicationContainer({ children }: { children: React.ReactNode }) {
  const { tailwindResponsive, md } = useTailwind();
  return (
    <NoSSR>
      <View style={tailwindResponsive('flex-1 flex-row flex-wrap flex-gap-10 my-10', { md: 'flex-col' }, { md })}>
        {children}
      </View>
    </NoSSR>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    flexGrow: 0,
    flexShrink: 1,
    flexBasis: '30%',
    shadowColor: 'rgba(0, 0, 0, 0.08)',
    shadowOffset: { width: 20, height: 14 },
    shadowRadius: 84,
    borderRadius: 8,
    borderTopRightRadius: 8,
  },
  title: {
    marginVertical: Token.spacing.m,
  },
  amount: { marginVertical: Token.spacing.xs },
});
