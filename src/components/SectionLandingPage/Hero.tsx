import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { View, StyleSheet } from 'react-native';
import { useQuery } from 'react-query';
import { useSprings, animated } from 'react-spring';
import NoSSR from 'react-no-ssr';
import { Element } from 'react-scroll';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import { useForm, useFieldArray } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';

import { fetcher } from 'core';
import { QUERY_KEYS } from 'core/constants';
import { ResponseItem, Question, User } from 'types';
import { routePaths } from 'routePaths';

import { HeroBannerInitial, HeroBannerChooseDate, HeroBannerChooseBudget, HeroBannerDone } from 'components/HeroBanner';
import useTailwind from 'hooks/useTailwind';

const Questionaire = dynamic(import(/* webpackChunkName: "Questionaire" */ 'components/Questionaire'), { ssr: false });
const Modal = dynamic(import(/* webpackChunkName: "Modal" */ 'core/base/Modal'), { ssr: false });
const SignUpForm = dynamic(import(/* webpackChunkName: "SignUp" */ 'components/SignUp'), { ssr: false });

export type HeroState = {
  name: string;
  value?: string;
  questionID?: number;
  tag?: string;
};

export type FormData = {
  states: HeroState[];
};

const AnimatedView = animated(View);
const heros = [HeroBannerInitial, HeroBannerChooseDate, HeroBannerChooseBudget, HeroBannerDone];

function Hero() {
  const { data, isLoading } = useQuery<ResponseItem<Question>>(QUERY_KEYS.QUESTION_LANDING_PAGE, async () => {
    const res = await fetcher<ResponseItem<Question>>({
      method: 'GET',
      url: '/question?section=landing_page',
    });
    return res;
  });
  const { data: userData } = useQuery<User>(QUERY_KEYS.CURRENT_USER);
  const totalData = data?.count || heros.length;
  const defaultValues = {
    states: Array(totalData)
      .fill(totalData)
      .map((_, idx) => ({
        name: data?.data?.[idx]?.title,
        questionID: data?.data?.[idx]?.id,
      })),
  };
  const { control, watch } = useForm<FormData>({ defaultValues });
  const fieldsArrayMethods = useFieldArray<FormData, 'states'>({
    control,
    name: 'states',
  });
  const [isVisible, setIsVisible] = useState(false);
  const [stateIndex, setStateIndex] = useState(0);
  const { t } = useTranslation();
  const router = useRouter();
  const { tailwind, tailwindResponsive, xl } = useTailwind();
  const herosSprings = useSprings(
    totalData,
    heros.map((_, index) =>
      index === stateIndex
        ? {
            flex: 0,
            opacity: 1,
            position: 'relative',
            zIndex: 1,
          }
        : { opacity: 0, position: 'absolute' }
    )
  );

  const onChangeTimelineBanner = (index: number) => {
    // Index + 1 because there is banner without hero timeline component in initial banner
    setStateIndex(index + 1);
  };

  const onSubmit = () => {
    if (stateIndex < totalData - 1) {
      setStateIndex((prev) => prev + 1);
    } else {
      // redirect to profile if already sign in
      if (userData?.name) {
        router.push(routePaths.account);
      } else {
        // Do register
        setIsVisible(true);
      }
    }
  };

  return (
    <Element name="find-my-home">
      <NoSSR>
        <View style={tailwind('flex flex-row')}>
          {herosSprings.map((animateStyle, idx) => {
            const HeroDescription = heros[idx];
            return (
              <AnimatedView
                key={`${idx}`}
                // @ts-ignore
                style={animateStyle}>
                <View style={tailwindResponsive('flex flex-1 flex-row items-center', { xl: 'flex-col' }, { xl })}>
                  <HeroDescription states={watch('states')} onChange={onChangeTimelineBanner} />
                  {!userData && (
                    <View
                      style={tailwindResponsive(
                        'w-1/4-screen -ml-48 items-center',
                        { xl: 'ml-0 self-start w-screen' },
                        { xl }
                      )}>
                      <Questionaire
                        loading={isLoading}
                        question={data?.data?.[stateIndex]}
                        methods={fieldsArrayMethods}
                        index={stateIndex}
                        onSubmit={onSubmit}
                        choiceLabel={t('choiceStatus')}
                        showSubmitButton={idx === totalData - 1}
                      />
                    </View>
                  )}
                </View>
              </AnimatedView>
            );
          })}
          {stateIndex === totalData - 1 && isVisible == true && (
            <Modal
              animationType="fade"
              visible={isVisible}
              onRequestClose={() => setIsVisible(false)}
              onDismiss={() => setIsVisible(false)}
              noPadding
              modalContentStyle={styles.modalContentStyle}>
              <SignUpForm landingPageAnswers={fieldsArrayMethods.fields} />
            </Modal>
          )}
        </View>
      </NoSSR>
      <DevTool control={control} />
    </Element>
  );
}

const styles = StyleSheet.create({
  modalContentStyle: {
    marginVertical: 100,
  },
});

export default Hero;
