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
        return (
          <AnimatedView
            key={name}
            // @ts-ignore
            style={animateStyle}
          >
            <Text
              accessibilityRole="link"
              onPress={() => onNavigateMenu(href)}
              style={[styles.menu, idx === 0 && styles.activeMenu]}
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
  { name: 'Events', href: '/' },
  { name: 'About Us', href: '/' },
  { name: 'Why Ryna', href: '/' },
  { name: 'Rental Homes', href: '/' },
  { name: 'Partner With Us', href: '/' },
  { name: 'Blog', href: '/' },
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
    borderBottomColor: Token.colors.blue,
    color: Token.colors.blue,
  },
});

export default Header;
