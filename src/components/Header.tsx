import React, { useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import NProgress from 'nprogress';
import NextNprogress from 'nextjs-progressbar';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useQuery } from 'react-query';
import { useSprings, animated, config } from 'react-spring';
import { fetcher, Token } from 'core';
import { menus, QUERY_KEYS } from 'core/constants';
import { User } from 'types';
import logo from 'assets/logo.svg';
import { routePaths } from 'routePaths';
import LanguageSelection from './LanguageSelection';
import { SignInButton } from './SignIn';
import UserLoginHeader from './UserLoginHeader';

const AnimatedView = animated(View);

function Header() {
  const router = useRouter();
  const { data, isLoading } = useQuery<User>(QUERY_KEYS.CURRENT_USER, () =>
    fetcher<User>({
      method: 'POST',
      url: '/user/current-user',
    })
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

  useEffect(() => {
    const handleStart = (url: string) => {
      console.log(`Loading: ${url}`);
      NProgress.start();
    };
    const handleStop = () => {
      NProgress.done();
    };

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleStop);
    router.events.on('routeChangeError', handleStop);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleStop);
      router.events.off('routeChangeError', handleStop);
    };
  }, [router]);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.menuWrapper}>
          <Pressable onPress={() => router.push(routePaths.home)}>
            <Image src={logo} alt="logo" />
          </Pressable>
          {menuAnimations.map((animateStyle, idx) => {
            const { name, href } = menus[idx];
            const isActiveMenu =
              href.replace('/', '') === router.pathname.split('/')[1];
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
        {!isLoading && data?.name ? (
          <UserLoginHeader {...data} />
        ) : (
          <SignInButton />
        )}
      </View>
      <NextNprogress
        color="#29D"
        startPosition={0.3}
        stopDelayMs={200}
        height={3}
        showOnShallow
      />
    </>
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
    zIndex: 1,
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
