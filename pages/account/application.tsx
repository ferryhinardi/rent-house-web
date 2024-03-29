import React from 'react';
import { useRouter } from 'next/router';
import { View, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Head, HeaderMenu, HeaderNavigation, ApplicationContainer, ApplicationCard, Footer } from 'components';
import { LineSharedPage } from 'components/LineBackground';
import { fetchServer, Token } from 'core';
import { Text, ContainerDesktop } from 'core/base';
import htmr from 'htmr';
import { routePaths } from '../../src/routePaths';
import { QUERY_KEYS } from 'core/constants';
import { QueryClient } from 'react-query';
import { NextApiRequest, NextApiResponse, NextPageContext } from 'next';
import { redirectIfUnauthenticated } from 'utils/auth';
import { ApplicationData, ResponseItem } from 'types';
import { dehydrate } from 'react-query/hydration';

type Props = {
  applications: ResponseItem<ApplicationData>;
};

export default function Application({ applications }: Props) {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <div>
      <Head />
      <HeaderMenu />
      <LineSharedPage />
      <ContainerDesktop>
        <HeaderNavigation title={t('application')} subtitle={t('applicationDescription')} />
        {applications && applications.data.length === 0 ? (
          <>
            <View style={styles.contentWrapper}>
              <Text>{htmr(t('emptyApplicationPlaceholder'))}</Text>
            </View>
            <View style={styles.separator} />
          </>
        ) : (
          <ApplicationContainer>
            {applications &&
              applications.data.map((item, key) => {
                const onNavigateApplicationDetail = () => {
                  router.push({
                    pathname: routePaths.applicationDetail,
                    query: { applicationId: item.id },
                  });
                };

                return <ApplicationCard key={key} application={item} onPress={onNavigateApplicationDetail} />;
              })}
          </ApplicationContainer>
        )}
      </ContainerDesktop>
      <Footer />
    </div>
  );
}

export async function getServerSideProps(context: NextPageContext) {
  const queryClient = new QueryClient();
  const user = await queryClient.fetchQuery(QUERY_KEYS.CURRENT_USER, () => redirectIfUnauthenticated(context));

  if (user === null) {
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
    };
  }

  const applications = await queryClient.fetchQuery([QUERY_KEYS.USER_APPLICATIONS, user?.id], () =>
    fetchServer<ResponseItem<ApplicationData>>(context.req as NextApiRequest, context.res as NextApiResponse, {
      method: 'GET',
      url: `/application/all?user_id=${user?.id}`,
    })
  );

  return {
    props: {
      applications,
      dehydratedState: dehydrate(queryClient),
    },
  };
}

const styles = StyleSheet.create({
  separator: {
    marginVertical: Token.spacing.xxl,
    borderBottomWidth: 4,
    borderBottomColor: Token.colors.rynaGray,
  },
  contentWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: Token.spacing.xxl,
  },
});
