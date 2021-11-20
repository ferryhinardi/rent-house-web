import React, { useState } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { Pressable, Text } from 'core/base';
import { Token } from 'core';

type Props = {
  menus: Array<{
    name: string;
    label: string;
    IconRight?: React.ReactNode;
  }>;
  onPress?: (menuId: string) => void;
  style?: React.CSSProperties;
};

function SideBar({ menus, onPress, style }: Props) {
  const [activeMenu, setActiveMenu] = useState(0);
  return (
    <View style={[styles.container, style as ViewStyle]}>
      {menus.map((menu, idx) => (
        <Pressable
          key={menu.name}
          onPress={() => {
            setActiveMenu(idx);
            onPress?.(menu.name);
          }}
          style={styles.menuWrapper}>
          <Text variant="button" ink="primary" style={styles.menu}>
            <View
              style={[
                styles.activeMenu,
                activeMenu === idx && {
                  backgroundColor: Token.colors.rynaYellow,
                },
              ]}
            />
            {menu.label}
          </Text>
          {menu.IconRight}
        </Pressable>
      ))}
    </View>
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

    marginRight: Token.spacing.xs,
  },
  menuWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: Token.spacing.l,
  },
  menu: {
    fontWeight: '600',
  },
});

export default SideBar;
