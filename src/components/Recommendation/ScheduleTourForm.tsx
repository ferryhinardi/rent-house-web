import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { useMutation, useQuery } from 'react-query';
import { fetcher, Token } from 'core';
import { Button, Text } from 'core/base';
import { QUERY_KEYS } from 'core/constants';
import { ApplicationData, ErrorHandling, ResponseItem, Room } from 'types';
import Toast from 'react-native-toast-message';

type Props = {
  house_id: number;
  external_url?: string;
};

type ApplicationRequest = {
  house_id: number;
};

export default function ScheduleTourForm(props: Props) {
  const router = useRouter();
  const { homeID } = router.query;
  const { t } = useTranslation();
  const { mutate: mutateApplication } = useMutation<ApplicationData, ErrorHandling, ApplicationRequest>(
    async (payload) =>
      fetcher<ApplicationData>({
        method: 'POST',
        url: '/application',
        data: payload,
      }),
    {
      onSuccess: (data) => {
        router.push({
          pathname: `/account/application/${data.id}`,
        });
      },
      onError: () => {
        Toast.show({
          type: 'error',
          text1: 'submit application failed!',
        });
      },
    }
  );

  const onNavigateHomeDetail = () => {
    const apppl: ApplicationRequest = {
      house_id: props.house_id,
    };
    mutateApplication(apppl);
  };

  const onScheduleTour = () => {
    window.open(props.external_url);
  };

  const { data } = useQuery([QUERY_KEYS.HOME_ROOM, homeID], async () => {
    const res = await fetcher<ResponseItem<Room>>({
      method: 'GET',
      url: '/room/all',
      params: { house_id: homeID },
    });
    return res;
  });

  var pricenih = '-';
  var rooms = data?.data as Room[];
  if (rooms.length != 0) {
    var maxPrice = 0;
    var minPrice = rooms[0].price;
    rooms.map((item) => {
      maxPrice = item.price > maxPrice ? item.price : maxPrice;
      minPrice = item.price < minPrice ? item.price : minPrice;
    });

    pricenih = maxPrice == minPrice ? `$${maxPrice}` : `$${minPrice}-$${maxPrice}`;
  }

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <InputBorder label="Starts from" value={pricenih} />
        <InputBorder label="Availability" value="Ready" />
      </View>
      {/* <Button variant="secondary" text={t('scheduleTourButton')} style={styles.button} onPress={onScheduleTour} /> */}
      <Button text={t('startYourApplication')} style={styles.button} onPress={onNavigateHomeDetail} />
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
