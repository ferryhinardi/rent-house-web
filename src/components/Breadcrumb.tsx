import React from 'react';
import Link from 'next/link';
import { StyleSheet, View } from 'react-native';
import { Token } from 'core';
import { Text } from 'core/base';

function Breadcrumbs() {
  return (
    <View style={styles.container}>
      <nav aria-label="Breadcrumb">
        <ol>
          <li>
            <Link href="/">
              <Text accessibilityRole="link" ink="secondary" variant="tiny">
                {'homepage'}
              </Text>
            </Link>
          </li>
          <li>
            <Link href="">
              <Text accessibilityRole="link" ink="secondary" variant="tiny">
                {'account'}
              </Text>
            </Link>
          </li>
          <li>
            <Link href="">
              <Text
                accessibilityRole="link"
                ink={'primary'}
                variant="tiny"
                style={styles.active}
              >
                {'profile'}
              </Text>
            </Link>
          </li>
        </ol>
        <style jsx>{`
          ol {
            list-style: none;
            padding-left: 0;
            margin: 0;
          }
          li {
            display: inline;
          }
          li + li::before {
            display: inline-block;
            transform: rotate(20deg);
            margin: 0 ${Token.spacing.s}px;
            border-right: 1px solid currentColor;
            height: 10px;
            content: '';
          }
          [aria-current='page'] {
            color: #000;
            font-weight: 700;
            text-decoration: none;
          }
        `}</style>
      </nav>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: Token.spacing.xxm,
  },
  active: {
    fontWeight: '600',
  },
});

export default Breadcrumbs;
