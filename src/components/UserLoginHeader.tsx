import React, { useRef, useState } from 'react';
import { useRouter } from 'next/router';
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

type Props = User;

function UserLoginHeader(props: Props) {
  const profileMenuRef = useRef<HTMLElement>();
  const { t } = useTranslation();
  const router = useRouter();
  const [isVisibile, setIsVisible] = useState(false);

  const onLogout = () => {
    logout();
    window.location.assign(routePaths.home);
  };

  const onNavigateToAccount = () => {
    router.push(routePaths.account);
  };

  useClickOutside(profileMenuRef, () => setIsVisible(false));

  return (
    <View style={styles.container}>
      {/* <Notification /> */}
      <Tooltip
        show={isVisibile}
        position="bottom"
        width="stretchToChild"
        arrowPosition="right"
        content={
          <View>
            <Pressable style={styles.dropDownMenu} onPress={onNavigateToAccount}>
              <Text ink="light">{t('myProfile')}</Text>
            </Pressable>
            <Pressable style={{ alignItems: 'flex-start' }} onPress={onLogout}>
              <Text ink="light">{t('logout')}</Text>
            </Pressable>
          </View>
        }>
        <Pressable style={styles.section} ref={profileMenuRef} onPress={() => setIsVisible((prev) => !prev)}>
          <View style={styles.button}>
            <Icon name="user" size={24} color={Token.colors.blue} />
          </View>
          <View style={styles.button}>
            <Text variant="paragraph" ink="primary">
              {props.name}
            </Text>
          </View>
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
    paddingHorizontal: Token.spacing.xs,
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Token.spacing.m,
    borderWidth: Token.border.width.thin,
    borderColor: Token.colors.rynaBlue,
    borderRadius: Token.border.radius.extra,
    height: 56,
  },
  dropDownMenu: {
    alignItems: 'flex-start',
    paddingBottom: Token.spacing.xxs,
    marginBottom: Token.spacing.xxs,
    borderBottomWidth: 1,
    borderBottomColor: Token.colors.white,
  },
});

export default UserLoginHeader;
