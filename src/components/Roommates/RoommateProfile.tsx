import React from 'react';
import Image from 'next/image';
import { View, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';

import config from 'config';
import assets from 'assets';
import { Token } from 'core';
import { Text } from 'core/base';

import { User } from 'types';

type RoommateProfileProps = {
  user?: User;
};
export default function RoommateProfile({ user }: RoommateProfileProps) {
  const { t } = useTranslation();
  const imgSource = user?.profile_picture ? `${config.imageHost}/${user.profile_picture}` : assets.profile;

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row' }}>
        <View style={styles.wrapperProfileInfo}>
          <Text variant="header-2" font="playfair" ink="primary">
            {user?.name}
          </Text>
          <Text variant="caption">{user?.job}</Text>
        </View>
        <View style={styles.wrapperImage}>
          <Image src={imgSource} blurDataURL={imgSource} alt="image" className="profileImage" placeholder="blur" />
        </View>
        <style jsx global>{`
          .profileImage {
            border-top-right-radius: 40px;
            box-shadow: rgb(0 0 0 / 8%) 20px 14px 84px;
          }
        `}</style>
      </View>

      <View style={styles.separator} />
      <View>
        <Text variant="header-2" font="playfair" ink="primary">
          {t('shortBio')}
        </Text>
        <Text variant="caption" style={styles.shortbio}>
          {user?.bio}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: Token.spacing.xxxxl,
  },
  wrapperProfileInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  wrapperImage: {
    flex: 1,
  },
  separator: {
    marginBottom: Token.spacing.xxxxl,
    borderBottomWidth: 4,
    borderBottomColor: Token.colors.rynaGray,
  },
  shortbio: {
    marginTop: Token.spacing.m,
  },
});
