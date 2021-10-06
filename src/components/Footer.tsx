import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { View, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
// @ts-ignore
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { Token } from 'core';
import { Text } from 'core/base';
import { menus } from 'core/constants';
import assets from 'assets';

function Footer() {
  const { t } = useTranslation();
  const router = useRouter();
  const onNavigateMenu = (href: string) => {
    router.push(href);
  };
  return (
    <View style={styles.container}>
      <View style={styles.footer}>
        <View style={styles.sectionLogo}>
          <Image src={assets.logoWhite} layout="fixed" alt="logo" />
          <Text ink="light">{t('footerTitle')}</Text>
        </View>
        <View style={styles.sectionMenu}>
          <Text ink="light" variant="title-3" style={styles.listTitle}>
            {t('footerMenuTitle')}
          </Text>
          {menus.map((menu) => (
            <Text
              key={menu.name}
              ink="light"
              accessibilityRole="link"
              onPress={() => onNavigateMenu(menu.href)}
              style={styles.list}
            >
              {menu.name}
            </Text>
          ))}
        </View>
        <View style={styles.sectionContactUs}>
          <Text ink="light" variant="title-3" style={styles.listTitle}>
            {t('footerContactUsTitle')}
          </Text>
          <Text ink="light" style={styles.list}>
            {t('contactUsEmail')}
          </Text>
          <Text ink="light" style={styles.list}>
            {t('contactUsTelp')}
          </Text>
        </View>
        <View style={styles.sectionFollowUs}>
          <Text ink="light" variant="title-3">
            {t('footerFollowUsTitle')}
          </Text>
          <FollowUsList />
        </View>
      </View>
      <Text ink="light" style={styles.copyRight}>
        {t('copyRightCaption')}
      </Text>
    </View>
  );
}

function FollowUsList() {
  return (
    <View style={styles.followUsContainer}>
      <Text
        accessibilityRole="link"
        // @ts-ignore
        href={''}
        style={styles.followUsWrapper}
      >
        <Icon name="facebook-f" size={30} color={Token.colors.white} />
      </Text>
      <Text
        accessibilityRole="link"
        // @ts-ignore
        href={''}
        style={styles.followUsWrapper}
      >
        <Icon name="twitter" size={30} color={Token.colors.white} />
      </Text>
      <Text
        accessibilityRole="link"
        // @ts-ignore
        href={''}
        style={styles.followUsWrapper}
      >
        <Icon name="instagram" size={30} color={Token.colors.white} />
      </Text>
      <Text
        accessibilityRole="link"
        // @ts-ignore
        href={''}
        style={styles.followUsWrapper}
      >
        <Icon name="linkedin" size={30} color={Token.colors.white} />
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Token.colors.blue,
    padding: Token.spacing.xxxxl,
  },
  footer: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  listTitle: {
    marginBottom: Token.spacing.xs,
  },
  list: {
    paddingTop: Token.spacing.m,
  },
  sectionLogo: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: '50%',
  },
  sectionMenu: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: '15%',
  },
  sectionContactUs: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: '15%',
  },
  sectionFollowUs: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: '20%',
  },
  followUsContainer: {
    flexDirection: 'row',
    marginTop: Token.spacing.l,
  },
  followUsWrapper: {
    flex: 1,
  },
  copyRight: {
    paddingTop: Token.spacing.xxxxxl,
    alignSelf: 'center',
  },
});

export default Footer;
