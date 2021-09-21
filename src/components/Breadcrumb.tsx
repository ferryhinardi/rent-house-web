import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';
import { Token } from 'core';
import { Text } from 'core/base';

// TODO: fix warning "Warning: Function components cannot be given refs." https://github.com/vercel/next.js/issues/7915
function Breadcrumbs() {
  const { t } = useTranslation();
  const { asPath } = useRouter();
  const listPath = asPath.split('/').filter((path) => path !== '');

  return (
    <View style={styles.container}>
      <nav aria-label="Breadcrumb">
        <ol>
          <li>
            <Link href="/" passHref>
              <Text accessibilityRole="link" ink="primary" variant="tiny">
                {t('homepage')}
              </Text>
            </Link>
          </li>
          {listPath.map((path, idx) => {
            const isActiveMenu = idx === listPath.length - 1;
            const hrefPath = listPath.slice(0, idx + 1);
            return (
              <li key={path}>
                <Link href={isActiveMenu ? '' : `/${hrefPath}`} passHref>
                  <Text
                    accessibilityRole="link"
                    ink={isActiveMenu ? 'normal' : 'primary'}
                    variant="tiny"
                    style={[isActiveMenu ? styles.active : {}]}
                  >
                    {t(`${path}`)}
                  </Text>
                </Link>
              </li>
            );
          })}
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
