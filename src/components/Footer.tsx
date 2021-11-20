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
  const year = new Date().getFullYear();

  return (
    <View style={styles.container}>
      <View style={styles.footer}>
        <View style={styles.sectionLogo}>
          <Image {...assets.logoWhite} placeholder="blur" layout="fixed" alt="logo" />
          <Text style={styles.logoTitle} ink="light">
            {t('footerTitle')}
          </Text>
        </View>
        <View style={styles.sectionMenu}>
          <Text ink="light" style={styles.listTitle}>
            {t('footerMenuTitle')}
          </Text>
          {menus.map((menu) => (
            <Text
              key={menu.name}
              ink="light"
              accessibilityRole="link"
              onPress={() => onNavigateMenu(menu.href)}
              style={styles.list}>
              {menu.name}
            </Text>
          ))}
        </View>
        <View style={styles.sectionContactUs}>
          <Text ink="light" style={styles.listTitle}>
            {t('footerContactUsTitle')}
          </Text>
          <View style={styles.list}>
            <a rel="noopener noreferrer" href={'mailto:hello@theryna.com'} target="_blank">
              <Text ink="light">{t('contactUsEmail')}</Text>
            </a>
          </View>
          <View style={styles.list}>
            <a href={'tel:' + t('telephoneNum')}>
              <Text ink="light">{t('contactUsTelp')}</Text>
            </a>
          </View>
        </View>
        <View style={styles.sectionFollowUs}>
          <Text style={styles.listTitle} ink="light">
            {t('footerFollowUsTitle')}
          </Text>
          <FollowUsList />
        </View>
      </View>
      <Text ink="light" style={styles.copyRight}>
        {t('copyRightCaption', { year: year })}
      </Text>
    </View>
  );
}

function FollowUsList() {
  return (
    <View style={styles.followUsContainer}>
      <View style={styles.followUsWrapper}>
        <a href={'https://www.facebook.com/therynaofficial/'} target="_blank" rel="noopener noreferrer">
          <Text accessibilityRole="link">
            <Icon name="facebook-f" size={18} color={Token.colors.white} />
          </Text>
        </a>
      </View>
      {/* <Text
        accessibilityRole="link"
        // @ts-ignore
        href={''}
        target="_blank"
      >
        <Icon name="twitter" size={18} color={Token.colors.white} />
      </Text> */}
      <View style={styles.followUsWrapper}>
        <a href={'https://www.instagram.com/therynaofficial/'} target="_blank" rel="noopener noreferrer">
          <Text accessibilityRole="link">
            <Icon name="instagram" size={18} color={Token.colors.white} />
          </Text>
        </a>
      </View>
      <View style={styles.followUsWrapper}>
        <a href={'https://www.linkedin.com/company/ryna/'} target="_blank" rel="noopener noreferrer">
          <Text accessibilityRole="link">
            <Icon name="linkedin" size={18} color={Token.colors.white} />
          </Text>
        </a>
      </View>
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
    fontWeight: '700',
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
    marginTop: Token.spacing.m,
    width: '80%',
  },
  followUsWrapper: {
    flex: 1,
  },
  copyRight: {
    paddingTop: Token.spacing.xxxxxl,
    alignSelf: 'center',
  },
  logoTitle: {
    fontSize: Token.fontSize.large,
    lineHeight: 28,
  },
});

export default Footer;
