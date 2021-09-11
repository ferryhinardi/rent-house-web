import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Token } from 'core';
import { Text, Input, CalendarInput, LoadingIndicator } from 'core/base';
import { Question } from 'types';
import Slider from './Slider';
import Container, {
  SliderConsumer,
  MinRange,
  MaxRange,
} from './Slider/Container';
import { UseFieldArrayReturn, useForm, useController } from 'react-hook-form';
import { OnSelectedDateCallback } from 'core/base/Calendar';

type Props = {
  loading: boolean;
  question?: Question;
  methods: UseFieldArrayReturn<FormData>;
  index: number;
};

const choicesSelectableTime = [
  'as soon as possible',
  '1 month later',
  '2 months later',
];

function Questionaire(props: Props) {
  const { t } = useTranslation();
  let QuestionContent;

  const minV =
    props.question == undefined
      ? MinRange
      : props.question.add_ons.range_number_min;
  const maxV =
    props.question == undefined
      ? MaxRange
      : props.question.add_ons.range_number_max;

  switch (props.question?.type) {
    case 'DATE':
      const onSelectedDateCallback: OnSelectedDateCallback = (
        value: string
      ) => {
        props.methods.update(props.index, {
          name: props.question?.title,
          value: value,
          questionID: props.question?.id,
        });
      };
      QuestionContent = (
        <div>
          {choicesSelectableTime.map((choice) => (
            <Input
              key={choice}
              editable={false}
              containerStyle={styles.containerTextInput}
              textInputStyle={styles.textInput}
              value={choice}
              onFocus={() => {
                props.methods.update(props.index, {
                  name: props.question?.title,
                  value: choice,
                  questionID: props.question?.id,
                });
              }}
            />
          ))}
          <br />
          <CalendarInput
            onSelectedDateCallback={onSelectedDateCallback}
            placeholder={t('placeholderCalendar')}
          />
        </div>
      );
      break;
    case 'RANGE_NUMBER':
      QuestionContent = (
        <Container>
          <SliderConsumer>
            {({ min = minV, max = maxV }) => (
              <Slider
                trackColor={'rgba(28,43,79,0.3)'} // Token.colors.rynaBlue with opacity
                trackHighlightColor={Token.colors.blue}
                value={[min, max]}
                step={50}
                minimumValue={minV}
                maximumValue={maxV}
                trackStyle={{ height: 8, borderRadius: 50 }}
                onValueChange={(value: number | number[]) => {
                  console.log('onValueChange', value);
                }}
                onSlidingStart={(value: number | number[]) =>
                  console.log('onSlidingStart', value)
                }
                onSlidingComplete={(value: number | number[]) => {
                  const answer = value as number[];
                  props.methods.update(props.index, {
                    name: props.question?.title,
                    value: '$' + answer[0] + '-' + '$' + answer[1],
                    questionID: props.question?.id,
                  });
                }}
              />
            )}
          </SliderConsumer>
        </Container>
      );
      break;
    case 'CHOICES':
      QuestionContent = props.question.add_ons.choices.map((choice) => (
        <Input
          key={choice}
          editable={false}
          containerStyle={styles.containerTextInput}
          textInputStyle={styles.textInput}
          value={choice}
          onFocus={() => {
            props.methods.update(props.index, {
              name: props.question?.title,
              value: choice,
              questionID: props.question?.id,
            });
          }}
        />
      ));
      break;
  }

  return (
    <>
      {props.loading ? (
        <LoadingIndicator />
      ) : (
        <>
          {props.question?.title && (
            <Text variant="huge" style={styles.title}>
              {props.question?.title}
            </Text>
          )}
          <Text variant="big" style={styles.subtitle}>
            {props.question?.question_text}
          </Text>

          {QuestionContent}
        </>
      )}
    </>
  );
}

type QuestionaireCardProps = {
  children: React.ReactNode;
  onSubmit?: () => void;
};

export function QuestionaireCard({
  children,
  onSubmit,
}: QuestionaireCardProps) {
  const { t } = useTranslation();
  return (
    <View style={styles.container}>
      {children}
      <Pressable style={styles.submitButton} onPress={onSubmit}>
        <Text ink="light">{t('submitQuestionButton')}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: Token.colors.white,
    borderTopLeftRadius: 60,
    borderBottomRightRadius: 60,
    borderWidth: Token.border.width.bold,
    borderColor: Token.colors.gold,
    paddingVertical: Token.spacing.xxxxxl,
    paddingHorizontal: Token.spacing.xl,
    alignSelf: 'flex-start',
  },
  title: {
    lineHeight: 36,
  },
  subtitle: {
    lineHeight: 28,
    marginVertical: Token.spacing.s,
  },
  containerTextInput: {
    paddingHorizontal: Token.spacing.l,
    paddingVertical: Token.spacing.m,
    marginTop: Token.spacing.l,
  },
  textInput: {
    // @ts-ignore
    cursor: 'pointer',
  },
  submitButton: {
    marginTop: Token.spacing.xl,
    paddingVertical: Token.spacing.m,
    borderTopLeftRadius: Token.spacing.xs,
    borderBottomRightRadius: Token.spacing.xs,
    backgroundColor: Token.colors.blue,
    alignItems: 'center',
  },
});

export default Questionaire;
