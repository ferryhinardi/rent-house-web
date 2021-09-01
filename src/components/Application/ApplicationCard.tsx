import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { Card, Badge, Text } from 'core/base';
import { Token } from 'core';

type Props = {
  onPress?: () => void;
};

export default function ApplicationCard({ onPress }: Props) {
  return (
    <Card style={styles.cardContainer}>
      <Pressable onPress={onPress}>
        <Card.Body>
          <Badge text="Deposit Incompleted" variant="alert" />
          <Text ink="dark" variant="header-4" style={styles.title}>
            {'Ryna x Minto Apartement'}
          </Text>
          <Text>{'Toronto'}</Text>
          <Text style={styles.amount}>{'$1500'}</Text>
          <Text>{'Moving Date: 21 Aug 2021'}</Text>
        </Card.Body>
      </Pressable>
    </Card>
  );
}

export function ApplicationContainer({
  children,
}: {
  children: React.ReactNode;
}) {
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
