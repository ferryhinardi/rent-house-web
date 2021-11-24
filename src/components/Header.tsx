import React from 'react';
import NoSSR from 'react-no-ssr';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Disclosure } from '@headlessui/react';
import Cookie from 'js-cookie';
import { View, Pressable, StyleSheet } from 'react-native';
import { useQuery } from 'react-query';

// @ts-ignore
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { fetcher, Token } from 'core';
import { menus, QUERY_KEYS } from 'core/constants';
import { User } from 'types';
import assets from 'assets';
import { routePaths } from 'routePaths';
import { SignInButton } from 'components/SignIn';
import UserLoginHeader from 'components/UserLoginHeader';
import { Text } from 'core/base';
import useTailwind from 'hooks/useTailwind';

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
  const { tailwind, tailwindResponsive, md } = useTailwind();
  const onNavigateMenu = (href: string) => {
    router.push(href);
  };

  return (
    <NoSSR>
      <View style={tailwind('min-h-full')}>
        <Disclosure as="nav" style={tailwind('bg-white shadow-lg')}>
          {({ open }) => (
            <>
              <View style={tailwind('max-w-8xl mx-auto px-4 py-10')}>
                <View style={tailwind('flex flex-row items-center justify-between h-16')}>
                  <View style={tailwind('flex flex-row self-start items-center')}>
                    {/* Website Logo */}
                    <Pressable onPress={() => router.push(routePaths.home)} style={tailwind('flex-shrink-0')}>
                      <Image {...assets.logo} alt="logo" />
                    </Pressable>
                    {/* Primary Navbar items */}
                    <View style={tailwindResponsive('flex', { md: 'hidden' }, { md })}>
                      <View style={tailwind('ml-10 flex-row flex-wrap flex items-center space-x-4')}>
                        {menus.map(({ name, href }) => {
                          const isActiveMenu = href.replace('/', '') === router.pathname.split('/')[1];
                          return (
                            <Text
                              key={name}
                              accessibilityRole="link"
                              onPress={() => onNavigateMenu(href)}
                              style={[
                                styles.menu,
                                isActiveMenu && [
                                  styles.activeMenu,
                                  { borderBottomWidth: 1, borderBottomColor: Token.colors.gold },
                                ],
                              ]}>
                              {name}
                            </Text>
                          );
                        })}
                      </View>
                    </View>
                  </View>
                  {/* Secondary Navbar items */}
                  <View style={tailwindResponsive('flex items-end space-x-3', { md: 'hidden' }, { md })}>
                    {!isLoading && data?.name ? <UserLoginHeader {...data} /> : <SignInButton />}
                  </View>
                  {/* Mobile menu button */}
                  <View style={tailwindResponsive('-mr-2 hidden', { md: 'flex' }, { md })}>
                    <Disclosure.Button className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                      {open ? (
                        <Icon name="times" size={24} color={Token.colors.blue} />
                      ) : (
                        <Icon name="bars" size={24} color={Token.colors.blue} />
                      )}
                    </Disclosure.Button>
                  </View>
                </View>
              </View>

              <Disclosure.Panel className="md:hidden">
                <View style={tailwind('px-2 pt-2 pb-3 space-y-1 sm:px-3')}>
                  {/* mobile menu */}
                  {menus.map(({ name, href }) => {
                    const isActiveMenu = href.replace('/', '') === router.pathname.split('/')[1];
                    return (
                      <Disclosure.Button
                        key={name}
                        as="a"
                        href={href}
                        style={tailwind(
                          classNames(
                            isActiveMenu
                              ? 'border-b border-t-0 border-l-0 border-r-0 border-solid border-yellow-500'
                              : '',
                            'block px-3 py-2'
                          )
                        )}
                        aria-current={isActiveMenu ? 'page' : undefined}>
                        <Text
                          onPress={() => onNavigateMenu(href)}
                          style={[styles.menu, isActiveMenu && styles.activeMenu]}>
                          {name}
                        </Text>
                      </Disclosure.Button>
                    );
                  })}
                </View>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </View>
    </NoSSR>
  );
}

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}

const styles = StyleSheet.create({
  menu: {
    paddingVertical: Token.spacing.xs,
    paddingHorizontal: Token.spacing.m,
  },
  activeMenu: {
    color: Token.colors.gold,
    fontWeight: '600',
  },
});

export default Header;
