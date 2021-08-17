import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { View, Text, StyleSheet } from 'react-native';
import { useQuery } from 'react-query';
import { useSprings, animated, config } from 'react-spring';
import { fetcher, Token } from 'core';
import { menus, QUERY_KEYS } from 'core/constants';
import LanguageSelection from './LanguageSelection';
import { SignInButton } from './SignIn';
import UserLoginHeader from './UserLoginHeader';
import logo from '../assets/logo.svg';
import { User } from 'types';

const AnimatedView = animated(View);

function Header() {
  const router = useRouter();
  const { data, isLoading } = useQuery<User>(QUERY_KEYS.CURRENT_USER, () =>
    fetcher<User>({
      method: 'POST',
      url: '/user/current-user',
    }));
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
      {!isLoading && data?.name ? <UserLoginHeader {...data} /> : <SignInButton />}
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
