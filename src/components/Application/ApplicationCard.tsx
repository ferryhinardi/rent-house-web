import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Badge, Text } from 'core/base';
import { Token } from 'core';
import { ApplicationData } from 'types';

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
        <Text ink="dark" variant="header-5" style={styles.title}>
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
  return <View style={styles.container}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Token.spacing.xxl,
    marginVertical: Token.spacing.xxl,
  },
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
