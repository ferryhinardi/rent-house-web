import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Pressable, Text } from 'core/base';
import { Token } from 'core';

type Props = {
  menus: Array<string>;
};

function SideBar({ menus }: Props) {
  const [activeMenu, setActiveMenu] = useState(0);
  return (
    <Card style={styles.container}>
      {menus.map((menu, idx) => (
        <Pressable
          key={menu}
          onPress={() => setActiveMenu(idx)}
          style={styles.menuWrapper}
        >
          <Text variant="sidebar-menu" ink="primary" style={styles.menu}>
            {activeMenu === idx && <View style={styles.activeMenu} />}
            {menu}
          </Text>
        </Pressable>
      ))}
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Token.colors.white,
    paddingHorizontal: Token.spacing.l,
    paddingBottom: Token.spacing.l,
    borderRadius: 8,
    shadowColor: Token.colors.black,
    shadowOpacity: 0.08,
    shadowOffset: { width: 8, height: 16 },
    shadowRadius: 94,
  },
  activeMenu: {
    width: 4,
    height: 16,
    borderRadius: Token.border.radius.default,
    backgroundColor: Token.colors.rynaYellow,
    marginRight: Token.spacing.xs,
  },
  menuWrapper: {},
  menu: {
    marginTop: Token.spacing.l,
    fontWeight: '600',
  },
});

export default SideBar;
