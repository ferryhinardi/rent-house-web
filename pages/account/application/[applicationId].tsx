import React from 'react';
import { NextPageContext } from 'next';
import { useRouter } from 'next/router';
import NoSSR from 'react-no-ssr';
import { Head, HeaderMenu, HeaderNavigation, ApplicationDetailContent, Footer } from 'components';
import { LineSharedPage } from 'components/LineBackground';
import { fetcher } from 'core';
import { Button, ContainerDesktop } from 'core/base';
import { QUERY_KEYS } from 'core/constants';
import { useMutation, useQuery } from 'react-query';
import { ApplicationData, ErrorHandling } from 'types';
import Toast from 'react-native-toast-message';
import { redirectIfUnauthenticated } from 'utils/auth';
import useTailwind from 'hooks/useTailwind';

type ApplicationCancelRequest = {
  status: string;
};
export default function ApplicationDetail() {
  const { tailwindResponsive, md } = useTailwind();
  const router = useRouter();
  const { query } = router;
  const { data } = useQuery(
    [QUERY_KEYS.APPLICATION_DETAIL, query.applicationId],
    async () => {
      const res = await fetcher<ApplicationData>({
        method: 'GET',
        url: `/application/${query.applicationId}`,
      });
      return res;
    },
    { enabled: query.applicationId !== undefined }
  );

  const { mutate: mutateCancelApplication } = useMutation<ApplicationData, ErrorHandling, ApplicationCancelRequest>(
    async (payload) =>
      fetcher<ApplicationData>({
        method: 'PATCH',
        url: `/application/${data?.id}/status`,
        data: payload,
      }),
    {
      onSuccess: () => {
        router.reload();
      },
      onError: () => {
        Toast.show({
          type: 'error',
          text1: 'cancel application failed!',
        });
      },
    }
  );

  const handleCancelApplication = () => {
    mutateCancelApplication({ status: 'canceled' });
  };

  return (
    <NoSSR>
      <Head />
      <HeaderMenu />
      <LineSharedPage />
      <ContainerDesktop>
        <HeaderNavigation title={data?.house.name as string} />
        <ApplicationDetailContent application={data} />
        {(data?.status as string) == 'submitted' && (
          <Button
            style={tailwindResponsive('mb-10 self-start', { md: 'self-auto' }, { md })}
            variant="secondary"
            text={'Cancel Application'}
            onPress={handleCancelApplication}
          />
        )}
      </ContainerDesktop>
      <Footer />
    </NoSSR>
  );
}

export async function getServerSideProps(context: NextPageContext) {
  const user = redirectIfUnauthenticated(context);

  if (user === null) {
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
    };
  }

  return {
    props: {},
  };
}
