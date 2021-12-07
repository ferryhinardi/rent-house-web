import React from 'react';
import { NextPageContext, NextApiRequest, NextApiResponse } from 'next';
import Toast from 'react-native-toast-message';
import { useTranslation } from 'react-i18next';
import { useMutation, QueryClient, useQuery } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import { FormProvider, useForm } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import { Head, HeaderMenu, HeaderNavigation, Footer } from 'components';
import { fetcher, fetchServer } from 'core';
import { ContainerDesktop } from 'core/base';
import { approximateIncomeOptions, genderOptions, QUERY_KEYS, vaccineStatusOptions } from 'core/constants';
import { User, EmergencyContactType, UserDocument, ErrorHandling, PayloadUpdateUser, House } from 'types';
import createPayloadUpdateUser from 'utils/createPayloadUpdateUser';
import { redirectIfUnauthenticated } from 'utils/auth';
import clientUpload from 'core/fetcher/upload';
import ScheduleTourDetail from 'components/ScheduleTour/ScheduleTourUserInfo';
import { useRouter } from 'next/router';

type Props = {
  user: User;
};

type PromiseResult = Array<User | EmergencyContactType[] | UserDocument>;

export default function ScheduleTourPage({ user }: Props) {
  const router = useRouter();
  const { homeID } = router.query;

  const forms = useForm<PayloadUpdateUser>({
    defaultValues: {
      ...user,
      // set default values for options field
      gender: genderOptions.find((x) => x.value === user.gender),
      approximate_income: approximateIncomeOptions.find((x) => x.label === user.approximate_income),
      vaccine_status: vaccineStatusOptions.find((x) => x.value === user.vaccine_status),
    },
  });

  const { t } = useTranslation();

  const { data: house } = useQuery(
    [QUERY_KEYS.HOME_DETAIL, homeID],
    async () => {
      const res = await fetcher<House>({
        method: 'GET',
        url: `/house/${homeID}`,
      });
      return res;
    },
    { enabled: homeID !== undefined }
  );

  const { mutate } = useMutation<PromiseResult, ErrorHandling, PayloadUpdateUser>(
    async (payload) => {
      const { bodyFormDataUser } = createPayloadUpdateUser(payload);
      const promiseRequest: Array<Promise<User>> = [
        clientUpload<User>({
          method: 'PUT',
          url: `/user/${user.id}`,
          data: bodyFormDataUser,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }),
      ];

      // @ts-ignore
      return Promise.all(promiseRequest);
    },
    {
      onSuccess: (response: PromiseResult) => {
        Toast.show({
          type: 'success',
          text1: `Update user data ${(response[0] as User)?.name} Successfully!`,
        });
      },
      onError: (error) => {
        Toast.show({
          type: 'error',
          text1: `Update Failed! ${error.message}`,
        });
      },
    }
  );
  const onSubmit = (data: PayloadUpdateUser) => {
    mutate(data);
    window.open(house?.external_url);
  };

  return (
    <div>
      <Head />
      <HeaderMenu />
      {/* <LineSharedPage /> */}
      <ContainerDesktop>
        <HeaderNavigation withBreadcrumb={false} title={t('scheduleTour')} />
        {/* @ts-ignore */}
        <FormProvider {...forms}>
          {/* @ts-ignore */}
          <ScheduleTourDetail onSubmit={forms.handleSubmit(onSubmit)} house={house} />

          <DevTool control={forms.control} />
        </FormProvider>
      </ContainerDesktop>
      <Footer />
    </div>
  );
}

export async function getServerSideProps(context: NextPageContext) {
  const { res, req, query } = context;
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

  if (!query.homeID) {
    return {
      notFound: true,
    };
  }

  await queryClient.fetchQuery([QUERY_KEYS.HOME_DETAIL, query.homeID], () =>
    fetchServer<House>(req as NextApiRequest, res as NextApiResponse, {
      method: 'GET',
      url: `/house/${query.homeID}`,
    })
  );

  return {
    props: {
      user,
      dehydratedState: dehydrate(queryClient),
    },
  };
}
