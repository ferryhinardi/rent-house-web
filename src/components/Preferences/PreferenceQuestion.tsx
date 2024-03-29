import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import NoSSR from 'react-no-ssr';
import { useRouter } from 'next/router';
import { useMutation } from 'react-query';
import { useSprings, animated } from 'react-spring';
import { UseFieldArrayReturn } from 'react-hook-form';
import Toast from 'react-native-toast-message';
import { fetcher, Token } from 'core';
import { Button, Text } from 'core/base';
import ProgressBar from 'components/Progress/Bar';
import Questionaire from 'components/Questionaire';
import { Answer, ErrorHandling, Login, Question, PreferenceQuestionState, QuestionState } from 'types';
import useTailwind from 'hooks/useTailwind';

type Props = {
  stateIndex: number;
  stateIndexSetter: React.Dispatch<React.SetStateAction<number>>;
  questions: Question[];
  answers?: Answer[];
  methods?: UseFieldArrayReturn<PreferenceQuestionState>;
};

export type FormQuestion = {
  states: QuestionState[];
};

export default function PreferenceQuestion(props: Props) {
  const { t } = useTranslation();
  const AnimatedView = animated(View);
  const router = useRouter();
  const { tailwindResponsive, md } = useTailwind();
  const [progressIndex, setProgressIndex] = React.useState(0);
  const questionSprings = useSprings(
    props.questions.length,
    props.questions.map((item, index) =>
      index === props.stateIndex
        ? {
            opacity: 1,
            position: 'relative',
            zIndex: 1,
          }
        : { opacity: 0, position: 'absolute' }
    )
  );
  const onTouchNext = () => {
    if (props.stateIndex < props.questions.length - 1) {
      props.stateIndexSetter((prev) => prev + 1);
    }
  };
  const onTouchPrev = () => {
    if (props.stateIndex - 1 >= 0) {
      props.stateIndexSetter((prev) => prev - 1);
    }
  };
  const { mutate: mutateAnswer } = useMutation<Login, ErrorHandling, Answer[]>(
    async (payload) =>
      fetcher<Login>({
        method: 'POST',
        url: '/answers',
        data: payload,
      }),
    {
      onSuccess: () => {
        router.replace('/account');
      },
      onError: () => {
        Toast.show({
          type: 'error',
          text1: 'Update Preference Failed!',
        });
      },
    }
  );

  const onSubmit = () => {
    if (progressIndex !== 1) {
      return;
    }
    var answers = new Array<Answer>();
    props.methods?.fields.map((item) => {
      answers.push({
        question_id: item.questionID as number,
        value: item.value as string,
        tag: item?.tag as string,
      });
    });

    mutateAnswer(answers);
  };

  React.useEffect(() => {
    var answered = 0;
    props.methods?.fields.map((item) => {
      if (item.value !== undefined) {
        answered += 1;
      }
    });

    setProgressIndex(Number((answered / props.questions.length).toFixed(1)));
  }, [props.methods?.fields, props.questions.length]);

  questionSprings.map((animateStyle, idx) => {
    var existsAnswer = props.answers?.find(function (o1) {
      if (o1.question_id === props.questions[idx].id) {
        return o1;
      }
    });

    if (props.methods?.fields[idx] === undefined && existsAnswer) {
      // set exists answer as default value
      props.methods?.update(idx, {
        name: props.questions[idx]?.title,
        value: existsAnswer.value,
        tag: props.questions[idx]?.matching_tag,
        questionID: props.questions[idx]?.id,
      });
    }
  });

  return (
    <NoSSR>
      <View style={styles.content}>
        {questionSprings.map((animateStyle, idx) => {
          return (
            <AnimatedView
              key={`${idx}`}
              // @ts-ignore
              style={animateStyle}>
              <View>
                <Questionaire
                  onSubmit={onTouchNext}
                  loading={false}
                  question={props.questions[idx]}
                  answer={props.answers?.find(function (o1) {
                    if (o1.question_id === props.questions[idx].id) {
                      return o1;
                    }
                  })}
                  index={idx}
                  methods={props.methods}
                  preferencePage={true}
                />
              </View>
            </AnimatedView>
          );
        })}
      </View>
      <View
        style={tailwindResponsive(
          'flex-row flex-wrap flex-gap-4 items-center mt-10',
          { md: 'flex-col items-start' },
          { md }
        )}>
        <Text variant="caption" ink="dark" style={styles.caption}>
          {t('completeness')}
        </Text>
        <ProgressBar
          progress={progressIndex}
          width={200}
          color={Token.colors.rynaBlue}
          unfilledColor={'rgba(28,43,79,0.24)'} // Token.colors.rynaBlue with opacity
          style={{ alignSelf: 'center' }}
        />
        <View style={styles.actionWrapper}>
          <Button
            variant="outline"
            IconStart="arrow-up"
            borderColor={Token.colors.rynaBlue}
            style={styles.button}
            onPress={onTouchPrev}
          />
          <Button
            variant="outline"
            IconStart="arrow-down"
            borderColor={Token.colors.rynaBlue}
            style={styles.button}
            onPress={onTouchNext}
          />
          {progressIndex === 1 && (
            <Button
              variant="outline"
              text={'submit'}
              borderColor={Token.colors.rynaBlue}
              disabled={progressIndex === 1 ? false : true}
              onPress={onSubmit}
              style={{
                alignSelf: 'flex-start',
                minWidth: 'unset',
                paddingHorizontal: 20,
                paddingVertical: Token.spacing.s,
                marginHorizontal: Token.spacing.xs,
              }}
            />
          )}
        </View>
      </View>
    </NoSSR>
  );
}

const styles = StyleSheet.create({
  caption: {
    marginRight: Token.spacing.xs,
  },
  actionWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    alignSelf: 'flex-start',
    minWidth: 'unset',
    paddingHorizontal: 0,
    paddingVertical: Token.spacing.s,
    marginHorizontal: Token.spacing.xs,
  },
  content: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: '68%',
  },
});
