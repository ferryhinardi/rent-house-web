import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

import { Token } from 'core';
import { Card, Text, Button, Image } from 'core/base';
import customImgLoader from 'core/utils/customImgLoader';
import { routePaths } from 'routePaths';
import config from 'config';
import assets from 'assets';

import { User } from 'types';

type RoommateCardProps = {
  roomate: User;
};

export default function RoommateCard({ roomate }: RoommateCardProps) {
  const { t } = useTranslation();
  const router = useRouter();
  const onNavigateRoommateDetail = () => {
    router.push({
      pathname: routePaths.roommateDetail,
      query: { userId: roomate.id },
    });
  };

  const imgSource = roomate?.profile_picture
    ? `${config.imageHost}/${roomate.profile_picture}`
    : assets.placehoderImage;

  return (
    <Card style={styles.containerCard}>
      <Card.Body>
        <Image
          src={imgSource}
          blurDataURL={imgSource}
          className="image-galery"
          loader={customImgLoader}
          placeholder="blur"
          objectFit="cover"
          width={240}
          height={240}
          alt="image"
        />
        <View style={styles.wrapperInfo}>
          <Text variant="header-3" style={styles.roommateName}>
            {roomate.name}
          </Text>
          <Text variant="caption" ink="primary">
            {roomate.job}
          </Text>
        </View>

        <Button text={t('roommatesViewButton')} onPress={onNavigateRoommateDetail} />
      </Card.Body>
      <style jsx global>{`
        .image-galery {
          border-radius: 8px;
        }
      `}</style>
    </Card>
  );
}

const styles = StyleSheet.create({
  containerCard: {
    flexGrow: 0,
    flexShrink: 1,
    flexBasis: '48%',
    overflow: 'hidden',
    borderTopRightRadius: Token.border.radius.default,
    borderRadius: Token.border.radius.default,
  },
  wrapperInfo: {
    marginVertical: Token.spacing.xl,
  },
  roommateName: {
    marginBottom: Token.spacing.l,
  },
});
