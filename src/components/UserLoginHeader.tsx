import React, { useRef, useState } from 'react';
import Router from 'next/router';
import { View, StyleSheet } from 'react-native';
// @ts-ignore
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { useTranslation } from 'react-i18next';
import { Token } from 'core';
import { Text, Pressable, Tooltip } from 'core/base';
import useOutsideClick from 'core/hooks/useClickOutside';
import { User } from 'types';
import { logout } from 'utils/auth';

type Props = User;

function UserLoginHeader(props: Props) {
  const profileMenuRef = useRef<HTMLElement>();
  const { t } = useTranslation();
  const [isVisibile, setIsVisible] = useState(false);
  const onLogout = () => {
    logout();
    Router.reload();
  };

  useOutsideClick(profileMenuRef, () => setIsVisible(false));

  return (
    <View style={styles.container}>
      <Pressable style={styles.button}>
        <Icon name="bell" size={24} color={Token.colors.blue} />
      </Pressable>
      <Pressable style={styles.button}>
        <Icon name="user" size={24} color={Token.colors.blue} />
      </Pressable>
      <Tooltip
        show={isVisibile}
        position="bottom"
        contentZIndex={100000000}
        width='stretchToChild'
        content={
          <Pressable style={{ alignItems: 'center' }} onPress={onLogout}>
            <Text ink='light'>{t('logout')}</Text>
          </Pressable>
        }
      >
        <Pressable ref={profileMenuRef} style={styles.button} onPress={() => setIsVisible(prev => !prev)}>
          <Text ink='primary'>{props.name}</Text>
        </Pressable>
      </Tooltip>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  button: {
    padding: Token.spacing.m,
  },
});

export default UserLoginHeader;
