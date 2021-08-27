import React, { useRef, useState } from 'react';
import Router, { useRouter } from 'next/router';
import { View, StyleSheet } from 'react-native';
// @ts-ignore
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { useTranslation } from 'react-i18next';
import { Token } from 'core';
import { Text, Pressable, Tooltip } from 'core/base';
import { useClickOutside } from 'core/hooks';
import { User } from 'types';
import { logout } from 'utils/auth';
import { routePaths } from 'routePaths';
import Notification from './Notification';

type Props = User;

function UserLoginHeader(props: Props) {
  const profileMenuRef = useRef<HTMLElement>();
  const { t } = useTranslation();
  const router = useRouter();
  const [isVisibile, setIsVisible] = useState(false);
  const onLogout = () => {
    logout();
    Router.reload();
  };
  const onNavigateToAccount = () => {
    router.push(routePaths.account);
  };

  useClickOutside(profileMenuRef, () => setIsVisible(false));

  return (
    <View style={styles.container}>
      <Notification />
      <Pressable style={styles.button} onPress={onNavigateToAccount}>
        <Icon name="user" size={24} color={Token.colors.blue} />
      </Pressable>
      <Tooltip
        show={isVisibile}
        position="bottom"
        width="stretchToChild"
        content={
          <Pressable style={{ alignItems: 'center' }} onPress={onLogout}>
            <Text ink="light">{t('logout')}</Text>
          </Pressable>
        }
      >
        <Pressable
          ref={profileMenuRef}
          style={styles.button}
          onPress={() => setIsVisible((prev) => !prev)}
        >
          <Text ink="primary">{props.name}</Text>
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
