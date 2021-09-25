import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { Button, Text } from 'core/base';
import { fetcher, Token } from 'core';
import { House, ResponseItem, Room } from 'types';
import { useQuery } from 'react-query';

type Props = {
  house: House;
};

export default function ScheduleTourForm(props: Props) {
  const { t } = useTranslation();
  const router = useRouter();
  const onNavigateHomeDetail = () => {
    router.push({
      pathname: `/account/application/${props.house.id}`,
    });
  };

  const onScheduleTour = () => {
    window.open(props.house.external_url);
  };

  const { data, isLoading } = useQuery('rooms', async () => {
    const res = await fetcher<ResponseItem<Room>>({
      method: 'GET',
      url: `/room/all?house_id=${props.house.id}`,
    });
    return res;
  });

  if (isLoading) {
    return <p></p>;
  }

  var pricenih = '-';
  var rooms = data?.data as Room[];
  if (rooms.length != 0) {
    var maxPrice = 0;
    var minPrice = rooms[0].price;
    rooms.map((item) => {
      maxPrice = item.price > maxPrice ? item.price : maxPrice;
      minPrice = item.price < minPrice ? item.price : minPrice;
    });

    console.log('sekali');
    pricenih =
      maxPrice == minPrice ? `$${maxPrice}` : `$${minPrice}-$${maxPrice}`;
  }

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <InputBorder label="Starts from" value={pricenih} />
        <InputBorder label="Availability" value="Ready" />
      </View>
      <Button
        variant="secondary"
        text={t('scheduleTourButton')}
        style={styles.button}
        onPress={onScheduleTour}
      />
      <Button
        text={t('startYourApplication')}
        style={styles.button}
        onPress={onNavigateHomeDetail}
      />
    </View>
  );
}

function InputBorder({ label, value }: { label: string; value: string }) {
  return (
    <Pressable style={styles.wrapperInputBorder}>
      <Text>{label}</Text>
      <Text>{value}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {},
  wrapper: {
    marginVertical: Token.spacing.xl,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Token.spacing.l,
  },
  wrapperInputBorder: {
    padding: Token.spacing.m,
    borderRadius: Token.border.radius.default,
    borderColor: Token.colors.rynaBlue,
    borderWidth: Token.border.width.thin,
    alignItems: 'flex-start',
  },
  button: {
    width: '50%',
    marginTop: Token.spacing.xxl,
  },
});
