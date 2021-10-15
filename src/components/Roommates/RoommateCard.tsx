import React from 'react';
import { View, StyleSheet } from 'react-native';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { Token } from 'core';
import { Card, Text, Button } from 'core/base';
import customImgLoader from 'core/utils/customImgLoader';
import { routePaths } from 'routePaths';
import config from 'config';

import { User } from 'types';

const imagePlaceholder = 'https://uploader-assets.s3.ap-south-1.amazonaws.com/codepen-default-placeholder.png';

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

  const imgSource = roomate?.profile_picture ? `${config.imageHost}/${roomate.profile_picture}` : imagePlaceholder;
  return (
    <Card style={styles.containerCard}>
      <Card.Body>
        <Image
          src={imgSource}
          blurDataURL={imgSource}
          loader={customImgLoader}
          placeholder="blur"
          width={240}
          height={240}
          alt="image"
        />
        <View style={styles.wrapperInfo}>
          <Text variant="header-3" font="playfair" style={styles.roommateName}>
            {roomate.name}
          </Text>
          <Text variant="caption" ink="primary">
            {roomate.job}
          </Text>
        </View>

        <Button text={t('roommatesViewButton')} onPress={onNavigateRoommateDetail} />
      </Card.Body>
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
