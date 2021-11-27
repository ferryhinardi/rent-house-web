import React from 'react';
import { useRouter } from 'next/router';
import { View, StyleSheet } from 'react-native';
import { useQuery } from 'react-query';
import { useTranslation } from 'react-i18next';
// @ts-ignore
import Icon from 'react-native-vector-icons/dist/FontAwesome';

import config from 'config';
import assets from 'assets';
import { Token, fetcher } from 'core';
import { Text, Image } from 'core/base';
import { QUERY_KEYS } from 'core/constants';
import { User } from 'types';
import useTailwind from 'hooks/useTailwind';

export default function RoommateProfile() {
  const { tailwind, tailwindResponsive, md } = useTailwind();
  const router = useRouter();
  const { userId } = router.query;
  const { t } = useTranslation();
  const { data: user } = useQuery<User>(
    QUERY_KEYS.USER,
    async () => {
      const res = await fetcher<User>({
        method: 'GET',
        url: `/user/${userId}`,
      });
      return res;
    },
    { enabled: userId !== undefined }
  );

  const imgSource = user?.profile_picture ? `${config.imageHost}/${user.profile_picture}` : assets.placehoderImage;

  return (
    <View style={tailwind('p-14')}>
      <View style={tailwindResponsive('flex-row flex-wrap flex-gap-4 mb-10', { md: 'flex-col' }, { md })}>
        <View style={styles.wrapperProfileInfo}>
          <Text variant="header-2" font="playfair" ink="primary">
            {user?.name}
          </Text>
          <Text variant="caption">{user?.job}</Text>
        </View>
        <View style={tailwindResponsive('flex-1 w-1/2-screen', { md: 'w-full' }, { md })}>
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
        <Text variant="header-2" font="playfair" ink="primary" style={styles.profileHeader}>
          {t('shortBio')}
        </Text>
        <Text variant="caption" style={styles.shortbio}>
          {user?.bio}
        </Text>
      </View>
      <View style={styles.separator} />
      <View>
        <View style={styles.socialMediaContainer}>
          <Text variant="header-2" font="playfair" ink="primary" style={styles.profileHeader}>
            {t('socialMedia')}
          </Text>
          <View style={styles.socialMediaRow}>
            <Icon color={Token.colors.rynaBlue} size={20} name="instagram" />
            <Text
              accessibilityRole="link"
              // @ts-ignore
              href={user?.instagram_url}
              target="_blank"
              style={styles.socialMediaUrl}>
              {' '}
              Instagram url
            </Text>
          </View>
          <View style={styles.socialMediaRow}>
            <Icon color={Token.colors.rynaBlue} size={20} name="twitter" />
            <Text
              accessibilityRole="link"
              // @ts-ignore
              href={user?.twitter_url}
              target="_blank"
              style={styles.socialMediaUrl}>
              {' '}
              Twitter url
            </Text>
          </View>
          <View style={styles.socialMediaRow}>
            <Icon color={Token.colors.rynaBlue} size={20} name="facebook" />
            <Text
              accessibilityRole="link"
              // @ts-ignore
              href={user?.facebook_url}
              target="_blank"
              style={styles.socialMediaUrl}>
              {' '}
              Facebook url
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapperProfileInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  separator: {
    marginBottom: Token.spacing.xxxxl,
    borderBottomWidth: 4,
    borderBottomColor: Token.colors.rynaGray,
  },
  shortbio: {
    marginTop: Token.spacing.m,
    marginBottom: Token.spacing.m,
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
  profileHeader: {
    marginBottom: Token.spacing.m,
  },
});
