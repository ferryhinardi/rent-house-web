import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { fetcher, Token } from 'core';
import { Button, Text } from 'core/base';
import ProgressBar from '../Progress/Bar';
import Questionaire from '../Questionaire';
import { Answer, ErrorHandling, Login, Question } from 'types';
import { useSprings, animated } from 'react-spring';
import { UseFieldArrayReturn } from 'react-hook-form';
import { useMutation } from 'react-query';
import { useRouter } from 'next/router';
import { PreferenceQuestionState } from '../../../pages/account/preference';

type Props = {
  stateIndex: number;
  stateIndexSetter: React.Dispatch<React.SetStateAction<number>>;
  questions: Question[];
  methods?: UseFieldArrayReturn<PreferenceQuestionState>;
};

export type QuestionState = {
  name: string;
  value?: string;
  questionID?: number;
};

export type FormQuestion = {
  states: QuestionState[];
};

export default function PreferenceContent(props: Props) {
  const { t } = useTranslation();
  const AnimatedView = animated(View);
  const router = useRouter();

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
        // we need toast component to show error
        console.log('error here');
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

  return (
    <View>
      <View style={styles.content}>
        {questionSprings.map((animateStyle, idx) => {
          return (
            <AnimatedView
              key={`${idx}`}
              // @ts-ignore
              style={animateStyle}
            >
              <View>
                <Questionaire
                  loading={false}
                  question={props.questions[idx]}
                  index={idx}
                  methods={props.methods}
                />
              </View>
            </AnimatedView>
          );
        })}
      </View>
      <View style={styles.footer}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Token.spacing.xxl,
  },
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
