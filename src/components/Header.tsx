import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { View, Text, StyleSheet } from 'react-native';
import { useSprings, animated, config } from 'react-spring';
import { Token } from 'core';
import { menus } from 'core/constants';
import LanguageSelection from './LanguageSelection';
import { SignInButton } from './SignIn';
import logo from '../assets/logo.svg';

const AnimatedView = animated(View);

function Header() {
  const router = useRouter();
  const menuAnimations = useSprings(
    menus.length,
    // all animations
    menus.map(() => ({
      from: {
        opacity: 0
      },
      to: {
        opacity: 1
      },
      config: {
        ...config.molasses,
        duration: 1000,
      }
    }))
   );
   const onNavigateMenu = (href: string) => {
    router.push(href);
   };

  return (
    <View style={styles.container}>
      <View style={styles.menuWrapper}>
        <Image src={logo} alt="logo" />
        {menuAnimations.map((animateStyle, idx) => {
          const { name, href } = menus[idx];
          const isActiveMenu = href.replace('/', '') === router.pathname.split('/')[1];
          return (
            <AnimatedView
              key={name}
              // @ts-ignore
              style={animateStyle}
            >
              <Text
                accessibilityRole="link"
                onPress={() => onNavigateMenu(href)}
                style={[styles.menu, isActiveMenu && styles.activeMenu]}
              >
                {name}
              </Text>
            </AnimatedView>
          );
        })}
      </View>
      <LanguageSelection />
      <SignInButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Token.spacing.xxl,
    paddingTop: Token.spacing.xxxl,
    paddingBottom: Token.spacing.xxxxxl,
  },
  menuWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menu: {
    paddingVertical: Token.spacing.xs,
    paddingHorizontal: Token.spacing.m,
  },
  activeMenu: {
    borderBottomWidth: 1,
    borderBottomColor: Token.colors.gold,
    color: Token.colors.gold,
  },
});

export default Header;
