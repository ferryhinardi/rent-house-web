import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { View, Text, StyleSheet } from 'react-native';
import { useSprings, animated, config } from 'react-spring';
import { Token } from 'core';
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
  );
}

const menus = [
  { name: 'Home', href: '/' },
  { name: 'Events', href: '/events' },
  { name: 'About Us', href: '/aboutus' },
  { name: 'Why Ryna', href: '/company-profile' },
  { name: 'Rental Homes', href: '/rental-homes' },
  { name: 'Partner With Us', href: '/partner-us' },
  { name: 'Blog', href: '/blog' },
  { name: 'Sign In', href: '/signin' },
];

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: Token.spacing.xxl,
    paddingTop: Token.spacing.xxxl,
    paddingBottom: Token.spacing.xxxxxl,
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
