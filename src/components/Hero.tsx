import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useQuery } from 'react-query';
import { useTranslation } from 'react-i18next';
import { useSpring, useSprings, animated, config } from 'react-spring';
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
import Questionaire from './Questionaire';
import SignUpForm from './SignUp';

const AnimatedView = animated(View);
const heros = [
  HeroBannerInitial,
  HeroBannerChooseDate,
  HeroBannerChooseBudget,
  HeroBannerDone,
];

function Hero() {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const [stateIndex, setStateIndex] = useState(0);
  const { data, isLoading } = useQuery(QUERY_KEYS.QUESTION, async () => {
    const res = await fetcher<ResponseItem<Question>>({
      method: 'GET',
      url: '/question/question',
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
          }
        : { opacity: 0, position: 'absolute' }
    )
  );
  const animateStyleQuestionaire = useSpring({
    from: { opacity: 0, transform: 'translate3d(-25%, 0px, 0px)' },
    to: { opacity: 1, transform: 'translate3d(0%, 0px, 0px)' },
    config: config.molasses,
  });
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
  const dummyState = [
    { name: t('timelineCity'), value: 'toronto' },
    { name: t('timelineMoveDate'), value: '01/09/2021' },
    { name: t('timelineBudget'), value: '01/09/2021' },
  ];

  return (
    <View style={styles.container}>
      {herosSprings.map((animateStyle, idx) => {
        const HeroDescription = heros[idx];
        return (
          <AnimatedView
            key={`${idx}`}
            // @ts-ignore
            style={animateStyle}
          >
            <HeroDescription
              states={dummyState}
              onChange={onChangeTimelineBanner}
            />
          </AnimatedView>
        );
      })}
      <AnimatedView
        // @ts-ignore
        style={{ ...animateStyleQuestionaire, flex: 0.6 }}
      >
        <View style={styles.containerSignUpForm}>
          <Questionaire
            loading={isLoading}
            question={data?.data?.[stateIndex]}
            onSubmit={onSubmit}
          />
        </View>
      </AnimatedView>
      {stateIndex === heros.length - 1 && (
        <Modal
          animationType="fade"
          visible={isVisible}
          onRequestClose={() => setIsVisible(false)}
          noPadding
        >
          <SignUpForm />
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    zIndex: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
  containerSignUpForm: {
    marginLeft: -200,
  },
});

export default Hero;
