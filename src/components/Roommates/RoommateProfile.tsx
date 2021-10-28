import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
// @ts-ignore
import Icon from 'react-native-vector-icons/dist/FontAwesome';

import config from 'config';
import assets from 'assets';
import { Token } from 'core';
import { Text, Image } from 'core/base';

import { User } from 'types';

type RoommateProfileProps = {
  user?: User;
};
export default function RoommateProfile({ user }: RoommateProfileProps) {
  const { t } = useTranslation();
  const imgSource = user?.profile_picture ? `${config.imageHost}/${user.profile_picture}` : assets.placehoderImage;

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', marginBottom: Token.spacing.xxxl }}>
        <View style={styles.wrapperProfileInfo}>
          <Text variant="header-2" font="playfair" ink="primary">
            {user?.name}
          </Text>
          <Text variant="caption">{user?.job}</Text>
        </View>
        <View style={styles.wrapperImage}>
          <Image
            width={'100%'}
            height={'100%'}
            src={imgSource}
            blurDataURL={imgSource}
            alt="image"
            className="profileImage"
            placeholder="blur"
            layout="responsive"
          />
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
        <View style={styles.socialMediaContainer}>
          <View style={styles.socialMediaRow}>
            <Icon color={Token.colors.rynaBlue} size={20} name="instagram" />
            <Text style={styles.socialMediaUrl}> Instagram url</Text>
          </View>
          <View style={styles.socialMediaRow}>
            <Icon color={Token.colors.rynaBlue} size={20} name="twitter" />
            <Text style={styles.socialMediaUrl}> Twitter url</Text>
          </View>
          <View style={styles.socialMediaRow}>
            <Icon color={Token.colors.rynaBlue} size={20} name="facebook" />
            <Text style={styles.socialMediaUrl}> Facebook url</Text>
          </View>
        </View>
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
    width: '45vw',
    height: 450,
  },
  separator: {
    marginBottom: Token.spacing.xxxxl,
    borderBottomWidth: 4,
    borderBottomColor: Token.colors.rynaGray,
  },
  shortbio: {
    marginTop: Token.spacing.m,
  },
  socialMediaRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  socialMediaUrl: {
    marginLeft: Token.spacing.s,
  },
  socialMediaContainer: {
    marginTop: Token.spacing.m,
    alignItems: 'flex-start',
  },
});
