import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { View, StyleSheet, Pressable } from 'react-native';
import { useTranslation } from 'react-i18next';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Token } from 'core';
import { Text } from 'core/base';
import { menus } from 'core/constants';
import logo from '../assets/logo-white.svg';

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
          <Image src={logo} layout="fixed" alt="logo" />
          <Text style={styles.content}>{t('footerTitle')}</Text>
        </View>
        <View style={styles.sectionMenu}>
          <Text style={[styles.title, styles.listTitle]}>{t('footerMenuTitle')}</Text>
          {menus.map(menu => (
            <Text
              key={menu.name}
              accessibilityRole="link"
              onPress={() => onNavigateMenu(menu.href)}
              style={[styles.list, styles.content]}
            >
              {menu.name}
            </Text>
          ))}
        </View>
        <View style={styles.sectionContactUs}>
          <Text style={[styles.title, styles.listTitle]}>{t('footerContactUsTitle')}</Text>
          <Text style={[styles.list, styles.content]}>{t('contactUsEmail')}</Text>
          <Text style={[styles.list, styles.content]}>{t('contactUsTelp')}</Text>
        </View>
        <View style={styles.sectionFollowUs}>
          <Text style={styles.title}>{t('footerFollowUsTitle')}</Text>
          <FollowUsList />
        </View>
      </View>
      <Text style={[styles.copyRight, styles.content]}>{t('copyRightCaption')}</Text>
    </View>
  );
}

function FollowUsList() {
  return (
    <View style={styles.followUsContainer}>
      <Pressable style={styles.followUsWrapper}>
        <Icon name="facebook-f" size={30} color={Token.colors.white} />
      </Pressable>
      <Pressable style={styles.followUsWrapper}>
        <Icon name="twitter" size={30} color={Token.colors.white} />
      </Pressable>
      <Pressable style={styles.followUsWrapper}>
        <Icon name="instagram-square" size={30} color={Token.colors.white} />
      </Pressable>
      <Pressable style={styles.followUsWrapper}>
        <Icon name="linkedin-in" size={30} color={Token.colors.white} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Token.colors.blue,
  },
  footer: {
    flex: 1,
    flexDirection: 'row',
  },
  title: {
    ...Token.typography.Baseline,
    fontWeight: 'bold',
    color: Token.colors.white,
  },
  content: {
    color: Token.colors.white,
  },
  listTitle: {
    marginBottom: Token.spacing.xs,
  },
  list: {
    paddingTop: Token.spacing.m,
  },
  sectionLogo: {
    flex: 0.5,
  },
  sectionMenu: {
    flex: 0.15
  },
  sectionContactUs: {
    flex: 0.15
  },
  sectionFollowUs: {
    flex: 0.20
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
