import React from 'react';
import Image from 'next/image';
import { View, Text, StyleSheet } from 'react-native';
import logo from '../assets/logo.svg';

function Header() {
  return (
    <View style={styles.container}>
      <Image src={logo} alt="logo" />
      {menus.map(({ name, href }, i) => (
        <Text
          key={name}
          accessibilityRole="link"
          // @ts-ignore
          href={href}
          style={[styles.menu, i === 0 && styles.activeMenu]}
        >
          {name}
        </Text>
      ))}
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
    paddingLeft: 42,
    paddingTop: 48,
    paddingBottom: 64,
  },
  menu: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  activeMenu: {
    borderBottomWidth: 1,
    borderBottomColor: '#D69E2E',
    color: '#D69E2E',
  },
});

export default Header;
