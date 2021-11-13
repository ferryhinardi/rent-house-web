import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Token } from 'core';
// @ts-ignore
import Icon from 'react-native-vector-icons/dist/FontAwesome';

export default function Footer() {
  return (
    <View style={styles.footer}>
      <View style={styles.socialMediaRow}>
        <a target="_blank" href="https://www.instagram.com/therynaofficial" rel="noopener noreferrer">
          <Icon name="instagram" size={42} />
        </a>
        <a target="_blank" href="https://www.facebook.com/therynaofficial" rel="noopener noreferrer">
          <Icon name="facebook" size={42} />
        </a>
        <a target="_blank" href="https://www.linkedin.com/company/ryna" rel="noopener noreferrer">
          <Icon name="linkedin" size={42} />
        </a>
      </View>
      <Text style={styles.copyRight}>{`© ${new Date().getFullYear()} by Ryna Living`}</Text>
      <Text style={styles.contactUs}>
        <a href="mailto:Hello@theRyna.com" role="normal" rel="noopener noreferrer">
          {'Hello@theRyna.com'}
        </a>
        {'   |  Tel: +1 647 370 1095'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    paddingTop: Token.spacing.ml,
    alignItems: 'center',
  },
  socialMediaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    // @ts-ignore
    gap: Token.spacing.ml,
    justifyContent: 'center',
    alignItems: 'center',
  },
  copyRight: {
    paddingVertical: Token.spacing.xs,
  },
  contactUs: {
    paddingBottom: Token.spacing.xxl,
  },
});
