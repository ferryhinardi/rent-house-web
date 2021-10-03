import React from 'react';
import { View, StyleSheet } from 'react-native';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import { Token } from 'core';
import { Card, Text, Button } from 'core/base';
import customImgLoader from 'core/utils/customImgLoader';

const imagePlaceholder =
  'https://uploader-assets.s3.ap-south-1.amazonaws.com/codepen-default-placeholder.png';

export default function RoommateCard() {
  const { t } = useTranslation();
  return (
    <Card style={styles.containerCard}>
      <Card.Body>
        <Image
          src={imagePlaceholder}
          blurDataURL={imagePlaceholder}
          loader={customImgLoader}
          placeholder="blur"
          width={240}
          height={240}
          alt="image"
        />
        <View style={styles.wrapperInfo}>
          <Text variant="header-3" font="playfair" style={styles.roommateName}>
            {'Sadie'}
          </Text>
          <Text variant="caption" ink="primary">
            {'Law Clerk'}
          </Text>
        </View>

        <Button text={t('roommatesViewButton')} />
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
