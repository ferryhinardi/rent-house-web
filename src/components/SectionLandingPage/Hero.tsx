import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useQuery } from 'react-query';
import { useSprings, animated } from 'react-spring';
import { Element } from 'react-scroll';
import { fetcher } from 'core';
import { Modal } from 'core/base';
import { QUERY_KEYS } from 'core/constants';
import { ResponseItem, Question } from 'types';
import { HeroBannerInitial, HeroBannerChooseDate, HeroBannerChooseBudget, HeroBannerDone } from 'components/HeroBanner';
import Questionaire from 'components/Questionaire';
import SignUpForm from 'components/SignUp';
import { useForm, useFieldArray } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';

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

  const herosSprings = useSprings(
    totalData,
    heros.map((item, index) =>
      index === stateIndex
        ? {
            opacity: 1,
            width: item.width,
            height: item.height,
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
      // Do register
      setIsVisible(true);
    }
  };

  return (
    <Element name="find-my-home">
      <View style={styles.container}>
        {herosSprings.map((animateStyle, idx) => {
          const HeroDescription = heros[idx];
          return (
            <AnimatedView
              key={`${idx}`}
              // @ts-ignore
              style={animateStyle}>
              <View style={styles.wrapper}>
                <HeroDescription states={watch('states')} onChange={onChangeTimelineBanner} />
                <View style={styles.containerSignUpForm}>
                  <Questionaire
                    loading={isLoading}
                    question={data?.data?.[stateIndex]}
                    methods={fieldsArrayMethods}
                    index={stateIndex}
                    onSubmit={onSubmit}
                  />
                </View>
              </View>
            </AnimatedView>
          );
        })}
        {stateIndex === totalData - 1 && (
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
      <DevTool control={control} />
    </Element>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  wrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  containerSignUpForm: {
    marginLeft: '-25%',
    width: '50%',
  },
  modalContentStyle: {
    marginVertical: 100,
  },
});

export default Hero;
