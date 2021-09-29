import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { UseFieldArrayReturn } from 'react-hook-form';
import { Token } from 'core';
import { Text, Button, Input, LoadingIndicator } from 'core/base';
import Slider from 'components/Slider';
import Container, {
  SliderConsumer,
  MinRange,
  MaxRange,
} from 'components/Slider/Container';
import { Question } from 'types';
import { FormData } from 'components/SectionLandingPage/Hero';
import { colors, fontSize } from 'core/base/Token';
import DirectCalendar from 'core/base/Calendar/DirectCalendar';

type Props = {
  loading: boolean;
  question?: Question;
  methods?: UseFieldArrayReturn<FormData>;
  index?: number;
};

const choicesSelectableTime = [
  'as soon as possible',
  '1 month later',
  '2 months later',
];

function Questionaire({ loading, question, methods, index = 0 }: Props) {
  const { t } = useTranslation();
  let QuestionContent;

  const minV =
    question == undefined ? MinRange : question.add_ons.range_number_min;
  const maxV =
    question == undefined ? MaxRange : question.add_ons.range_number_max;

  switch (question?.type) {
    case 'DATE':
      const onSelectedDateCallback = (value: string) => {
        methods?.update(index, {
          name: question?.title,
          value: value,
          tag: question?.matching_tag,
          questionID: question?.id,
        });
      };
      QuestionContent = (
        <View style={styles.alignCenterContainer}>
          <DirectCalendar
            onChange={onSelectedDateCallback}
            placeholder={t('placeholderCalendar')}
          />
        </View>
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
                value={[min!, max!]}
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
                  methods?.update(index, {
                    name: question?.title,
                    value: '$' + answer[0] + '-' + '$' + answer[1],
                    tag: question?.matching_tag,
                    questionID: question?.id,
                  });
                }}
              />
            )}
          </SliderConsumer>
        </Container>
      );
      break;
    case 'CHOICES':
      QuestionContent = question.add_ons.choices?.map((choice, idx) => (
        <Input
          key={choice}
          editable={false}
          containerStyle={
            methods?.fields[index]?.value === choice
              ? styles.selectedChoice
              : styles.containerTextInput
          }
          textInputStyle={styles.textInput}
          value={choice}
          rightLabel={
            <Text
              style={{
                color:
                  methods?.fields[index]?.value === choice
                    ? colors.rynaBlack
                    : colors.textDarkGrey,
              }}
            >
              {t('choiceStatus')}
            </Text>
          }
          onFocus={() => {
            methods?.update(index, {
              name: question?.title,
              value: choice,
              tag:
                question?.matching_tag.length != 0
                  ? question?.matching_tag
                  : (question?.add_ons?.tags?.[idx] as string),
              questionID: question?.id,
            });
          }}
        />
      ));
      break;
  }

  return (
    <>
      {loading ? (
        <LoadingIndicator />
      ) : (
        <>
          {question?.title && (
            <Text
              font="playfair"
              variant="header-2"
              ink="primary"
              style={styles.title}
            >
              {question?.title}
            </Text>
          )}
          <Text variant="caption" style={styles.subtitle}>
            {question?.question_text}
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

      <Button
        style={styles.submitButton}
        text={t('submitQuestionButton')}
        onPress={onSubmit}
        textStyle={styles.buttonText}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: Token.colors.white,
    borderRadius: Token.border.radius.default,
    shadowOffset: { width: 8, height: 16 },
    shadowRadius: 94,
    shadowColor: 'rgba(0, 0, 0, 0.08)',
    padding: Token.spacing.l,
    alignSelf: 'flex-start',
    zIndex: 100,
  },
  alignCenterContainer: {
    alignItems: 'center',
  },
  title: {
    marginBottom: Token.spacing.ml,
  },
  subtitle: {
    marginBottom: Token.spacing.xl,
  },
  containerTextInput: {
    paddingHorizontal: Token.spacing.l,
    paddingVertical: Token.spacing.m,
    marginTop: Token.spacing.l,
  },
  selectedChoice: {
    paddingHorizontal: Token.spacing.l,
    paddingVertical: Token.spacing.m,
    marginTop: Token.spacing.l,
    borderWidth: 1,
    borderRadius: 64,
    borderColor: colors.blue,
  },
  textInput: {
    // @ts-ignore
    cursor: 'pointer',
  },
  submitButton: {
    marginTop: Token.spacing.xl,
    paddingVertical: Token.spacing.m,
    backgroundColor: Token.colors.blue,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: fontSize.medium,
  },
});

export default Questionaire;
