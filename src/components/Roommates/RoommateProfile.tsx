import React from 'react';
import { View, StyleSheet } from 'react-native';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import assets from 'assets';
import { Token } from 'core';
import { Text } from 'core/base';

export default function RoommateProfile() {
  const { t } = useTranslation();
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row' }}>
        <View style={styles.wrapperProfileInfo}>
          <Text variant="header-2" font="playfair" ink="primary">
            {'Sadie'}
          </Text>
          <Text variant="caption">{'Chief Mouser'}</Text>
        </View>
        <View style={styles.wrapperImage}>
          <Image
            {...assets.profile}
            className="profileImage"
            placeholder="blur"
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
          {
            'Sadie has had one heck of a life so far and has plenty of stories to tell. This adventurer was found living off the land, a nomad cat who hung out with other cat hippies - they preached free love (treats mostly), protested against dogs, and were often found dancing under the stars after rolling around in catnip.'
          }
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
