import React from 'react';
import { NextPageContext, NextApiRequest, NextApiResponse } from 'next';
import { View, StyleSheet } from 'react-native';
import Toast from 'react-native-toast-message';
import { useTranslation } from 'react-i18next';
import { useMutation, QueryClient } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import { FormProvider, useForm } from 'react-hook-form';
import {
  Head,
  HeaderMenu,
  HeaderNavigation,
  AccountBasicProfile,
  PersonalInfoForm,
  EmergencyContact,
  Footer,
} from 'components';
import { Token, fetcher, fetchServer } from 'core';
import { ContainerDesktop, Button, ErrorMessage } from 'core/base';
import { QUERY_KEYS } from 'core/constants';
import { User, UserDocument, ErrorHandling, PayloadUpdateUser } from 'types';
import createPayloadUpdateUser from 'utils/createPayloadUpdateUser';

type Props = {
  user: User;
};

export default function Profile({ user }: Props) {
  const forms = useForm<PayloadUpdateUser>({ defaultValues: user });
  const { t } = useTranslation();
  const { isLoading, isError, error, mutate } = useMutation<
    [User, UserDocument],
    ErrorHandling,
    PayloadUpdateUser
  >(
    async (payload) => {
      const { bodyFormDataUser, bodyFormDataDoc } =
        createPayloadUpdateUser(payload);
      return Promise.all([
        fetcher<User>({
          method: 'PUT',
          url: '/user/update',
          params: { id: user.id },
          data: bodyFormDataUser,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }),
        fetcher<UserDocument>({
          method: 'POST',
          url: `/user/user-document/`,
          data: bodyFormDataDoc,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }),
      ]);
    },
    {
      onSuccess: (response: [User, UserDocument]) => {
        Toast.show({
          type: 'success',
          text1: `Update Profile ${response[0].name} Successfully!`,
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
  const onSubmit = (formData: PayloadUpdateUser) => {
    forms.clearErrors();

    if (!formData.government_id?.length) {
      console.log('error government_id');
      forms.setError('government_id', {
        type: 'required',
        message: 'Please import File!',
      });
      return;
    }

    mutate(formData);
  };

  return (
    <div>
      <Head />
      <HeaderMenu />
      <ContainerDesktop>
        <HeaderNavigation title={t('profile')} />
        <FormProvider {...forms}>
          <AccountBasicProfile />
          <View style={styles.separator} />
          <PersonalInfoForm />
          <View style={styles.separator} />
          <EmergencyContact />
          <View style={styles.separator} />
          {isError && <ErrorMessage text={error?.message as string} />}
          <Button
            loading={isLoading}
            variant="secondary"
            text={t('saveForm')}
            style={styles.submitButton}
            onPress={forms.handleSubmit(onSubmit)}
          />
        </FormProvider>
      </ContainerDesktop>
      <Footer />
    </div>
  );
}

export async function getServerSideProps({ res, req }: NextPageContext) {
  // This value is considered fresh for ten seconds (s-maxage=10).
  // If a request is repeated within the next 10 seconds, the previously
  // cached value will still be fresh. If the request is repeated before 59 seconds,
  // the cached value will be stale but still render (stale-while-revalidate=59).
  //
  // In the background, a revalidation request will be made to populate the cache
  // with a fresh value. If you refresh the page, you will see the new value.
  // https://nextjs.org/docs/going-to-production#caching
  res?.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59'
  );
  const queryClient = new QueryClient();
  const user = await queryClient.fetchQuery(QUERY_KEYS.CURRENT_USER, () =>
    fetchServer<User>(req as NextApiRequest, res as NextApiResponse, {
      url: '/current-user',
    })
  );
  return {
    props: {
      user,
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
  submitButton: {
    marginBottom: Token.spacing.xxl,
    alignSelf: 'flex-end',
  },
});
