import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Cookie from 'js-cookie';
import { View, Pressable, StyleSheet } from 'react-native';
import { useQuery } from 'react-query';
import { useSprings, animated, config } from 'react-spring';

import { fetcher, Token } from 'core';
import { menus, QUERY_KEYS } from 'core/constants';
import { User } from 'types';
import assets from 'assets';
import { routePaths } from 'routePaths';
import { SignInButton } from 'components/SignIn';
import UserLoginHeader from 'components/UserLoginHeader';
import { Text } from 'core/base';

const AnimatedView = animated(View);

function Header() {
  const router = useRouter();
  const { data, isLoading } = useQuery<User>(
    QUERY_KEYS.CURRENT_USER,
    () =>
      fetcher<User>({
        method: 'POST',
        url: '/user/current-user',
      }),
    { enabled: Boolean(Cookie.get('token')) }
  );
  const menuAnimations = useSprings(
    menus.length,
    // all animations
    menus.map(() => ({
      from: {
        opacity: 0,
      },
      to: {
        opacity: 1,
      },
      config: {
        ...config.molasses,
        duration: 1000,
      },
    }))
  );
  const onNavigateMenu = (href: string) => {
    router.push(href);
  };

  return (
    <View style={styles.container}>
      <View style={styles.menuWrapper}>
        <Pressable onPress={() => router.push(routePaths.home)}>
          <Image {...assets.logo} alt="logo" />
        </Pressable>
        {menuAnimations.map((animateStyle, idx) => {
          const { name, href } = menus[idx];
          const isActiveMenu = href.replace('/', '') === router.pathname.split('/')[1];
          return (
            <AnimatedView
              key={name}
              // @ts-ignore
              style={{ ...animateStyle }}>
              <Text
                variant={'paragraph'}
                accessibilityRole="link"
                onPress={() => onNavigateMenu(href)}
                style={[styles.menu, isActiveMenu && styles.activeMenu]}>
                {name}
              </Text>
            </AnimatedView>
          );
        })}
      </View>
      {/* <LanguageSelection /> */}
      {!isLoading && data?.name ? <UserLoginHeader {...data} /> : <SignInButton />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Token.spacing.xxl,
    paddingVertical: Token.spacing.xxxl,
    zIndex: 1,
  },
  menuWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
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
    fontWeight: '600',
  },
});

export default Header;
