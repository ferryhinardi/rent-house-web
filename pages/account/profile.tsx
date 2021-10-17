import React from 'react';
import { NextPageContext, NextApiRequest, NextApiResponse } from 'next';
import { View, StyleSheet } from 'react-native';
import Toast from 'react-native-toast-message';
import { useTranslation } from 'react-i18next';
import { useMutation, QueryClient } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import { FormProvider, useForm } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import {
  Head,
  HeaderMenu,
  HeaderNavigation,
  AccountBasicProfile,
  PersonalInfoForm,
  SocialMedia,
  EmergencyContact,
  Footer,
} from 'components';
import { Token, fetcher, fetchServer } from 'core';
import { ContainerDesktop, Button, ErrorMessage } from 'core/base';
import { QUERY_KEYS } from 'core/constants';
import { User, ResponseItem, EmergencyContactType, UserDocument, ErrorHandling, PayloadUpdateUser } from 'types';
import createPayloadUpdateUser from 'utils/createPayloadUpdateUser';
import createDefaultEmergencyContact from 'utils/createDefaultEmergencyContact';
import { redirectIfUnauthenticated } from 'utils/auth';

type Props = {
  user: User;
  emergencyContacts: ResponseItem<EmergencyContactType>;
};
type PromiseResult = Array<User | EmergencyContactType[] | UserDocument>;

export default function Profile({ user, emergencyContacts }: Props) {
  const forms = useForm<PayloadUpdateUser>({
    // @ts-ignore
    defaultValues: { ...user, emergencyContacts: createDefaultEmergencyContact(emergencyContacts.data) },
  });
  const { t } = useTranslation();
  const { isLoading, isError, error, mutate } = useMutation<PromiseResult, ErrorHandling, PayloadUpdateUser>(
    async (payload) => {
      const {
        bodyFormDataUser,
        bodyFormGovermentDataDoc,
        bodyFormCreditScoreDataDoc,
        bodyFormProofIncomeGuarantorGovIdDataDoc,
        bodyFormProofIncomeGuarantorCreditReportDataDoc,
        bodyFormProofIncomeGuarantorPaystubDataDoc,
        bodyFormProofIncomePaystubDataDoc,
      } = createPayloadUpdateUser(payload);
      const promiseRequest: Array<Promise<User> | Promise<EmergencyContactType[]> | Promise<UserDocument>> = [
        fetcher<User>({
          method: 'PUT',
          url: '/user/update',
          params: { id: user.id },
          data: bodyFormDataUser,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }),
        fetcher<EmergencyContactType[]>({
          method: 'POST',
          url: `/user/emergency-contact`,
          data: payload.emergencyContacts,
          headers: {
            'Content-Type': 'application/json',
          },
        }),
      ];

      if (bodyFormGovermentDataDoc) {
        promiseRequest.push(
          fetcher<UserDocument>({
            method: 'POST',
            url: `/user/user-document/`,
            data: bodyFormGovermentDataDoc,
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
        );
      }

      if (bodyFormCreditScoreDataDoc) {
        promiseRequest.push(
          fetcher<UserDocument>({
            method: 'POST',
            url: `/user/user-document/`,
            data: bodyFormCreditScoreDataDoc,
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
        );
      }

      if (bodyFormProofIncomeGuarantorGovIdDataDoc) {
        promiseRequest.push(
          fetcher<UserDocument>({
            method: 'POST',
            url: `/user/user-document/`,
            data: bodyFormProofIncomeGuarantorGovIdDataDoc,
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
        );
      }

      if (bodyFormProofIncomeGuarantorCreditReportDataDoc) {
        promiseRequest.push(
          fetcher<UserDocument>({
            method: 'POST',
            url: `/user/user-document/`,
            data: bodyFormProofIncomeGuarantorCreditReportDataDoc,
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
        );
      }

      if (bodyFormProofIncomeGuarantorPaystubDataDoc) {
        promiseRequest.push(
          fetcher<UserDocument>({
            method: 'POST',
            url: `/user/user-document/`,
            data: bodyFormProofIncomeGuarantorPaystubDataDoc,
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
        );
      }

      if (bodyFormProofIncomePaystubDataDoc) {
        promiseRequest.push(
          fetcher<UserDocument>({
            method: 'POST',
            url: `/user/user-document/`,
            data: bodyFormProofIncomePaystubDataDoc,
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
        );
      }
      // @ts-ignore
      return Promise.all(promiseRequest);
    },
    {
      onSuccess: (response: PromiseResult) => {
        Toast.show({
          type: 'success',
          text1: `Update Profile ${(response[0] as User)?.name} Successfully!`,
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
        {/* @ts-ignore */}
        <FormProvider {...forms}>
          <AccountBasicProfile />
          <View style={styles.separator} />
          <PersonalInfoForm />
          <View style={styles.separator} />
          <SocialMedia />
          <View style={styles.separator} />
          <EmergencyContact />
          <View style={styles.separator} />
          {isError && <ErrorMessage text={error?.message as string} />}
          <Button
            loading={isLoading}
            variant="secondary"
            text={t('saveForm')}
            style={styles.submitButton}
            // @ts-ignore
            onPress={forms.handleSubmit(onSubmit)}
          />
          <DevTool control={forms.control} />
        </FormProvider>
      </ContainerDesktop>
      <Footer />
    </div>
  );
}

export async function getServerSideProps(context: NextPageContext) {
  // This value is considered fresh for ten seconds (s-maxage=10).
  // If a request is repeated within the next 10 seconds, the previously
  // cached value will still be fresh. If the request is repeated before 59 seconds,
  // the cached value will be stale but still render (stale-while-revalidate=59).
  //
  // In the background, a revalidation request will be made to populate the cache
  // with a fresh value. If you refresh the page, you will see the new value.
  // https://nextjs.org/docs/going-to-production#caching
  context.res?.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=59');
  const queryClient = new QueryClient();
  const user = await queryClient.fetchQuery(QUERY_KEYS.CURRENT_USER, () => redirectIfUnauthenticated(context));
  const emergencyContacts = await queryClient.fetchQuery([QUERY_KEYS.EMERGENCY_CONTACT, user?.id], () =>
    fetchServer<User>(context.req as NextApiRequest, context.res as NextApiResponse, {
      url: `/emergency-contact/${user?.id}`,
    })
  );
  return {
    props: {
      user,
      emergencyContacts,
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
