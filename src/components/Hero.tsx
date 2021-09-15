import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useQuery } from 'react-query';
import { useSprings, animated } from 'react-spring';
import { Element } from 'react-scroll';
import { fetcher } from 'core';
import { Modal } from 'core/base';
import { QUERY_KEYS } from 'core/constants';
import { ResponseItem, Question } from 'types';
import {
  HeroBannerInitial,
  HeroBannerChooseDate,
  HeroBannerChooseBudget,
  HeroBannerDone,
} from './HeroBanner';
import Questionaire, { QuestionaireCard } from './Questionaire';
import SignUpForm from './SignUp';
import { useForm, useFieldArray } from 'react-hook-form';

export type HeroState = {
  name: string;
  value?: string;
  questionID?: number;
};

export type FormData = {
  states: HeroState[];
};

const AnimatedView = animated(View);
const heros = [
  HeroBannerInitial,
  HeroBannerChooseDate,
  HeroBannerChooseBudget,
  HeroBannerDone,
];

function Hero() {
  const { control, watch } = useForm<FormData>();
  const fieldsArrayMethods = useFieldArray<FormData, 'states'>({
    control,
    name: 'states',
  });
  const [isVisible, setIsVisible] = useState(false);
  const [stateIndex, setStateIndex] = useState(0);
  const { data, isLoading } = useQuery(QUERY_KEYS.QUESTION, async () => {
    const res = await fetcher<ResponseItem<Question>>({
      method: 'GET',
      url: '/question/all',
      params: { section: 'landing_page' },
    });
    return res;
  });
  const herosSprings = useSprings(
    heros.length,
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
    if (stateIndex + 1 < heros.length) {
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
              style={animateStyle}
            >
              <View style={styles.wrapper}>
                <HeroDescription
                  states={watch('states')}
                  onChange={onChangeTimelineBanner}
                />
                <View style={styles.containerSignUpForm}>
                  <QuestionaireCard onSubmit={onSubmit}>
                    <Questionaire
                      loading={isLoading}
                      question={data?.data?.[stateIndex]}
                      methods={fieldsArrayMethods}
                      index={stateIndex}
                    />
                  </QuestionaireCard>
                </View>
              </View>
            </AnimatedView>
          );
        })}
        {stateIndex === heros.length - 1 && (
          <Modal
            animationType="fade"
            visible={isVisible}
            onRequestClose={() => setIsVisible(false)}
            noPadding
          >
            <SignUpForm landingPageAnswers={fieldsArrayMethods.fields} />
          </Modal>
        )}
      </View>
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
});

export default Hero;
