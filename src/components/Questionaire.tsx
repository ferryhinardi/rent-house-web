import React, { useEffect, useRef, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { UseFieldArrayReturn } from 'react-hook-form';
import { Token } from 'core';
import { Text, Button, Input, LoadingIndicator } from 'core/base';
import Slider from 'components/Slider';
import Container, { MinRange, MaxRange } from 'components/Slider/Container';
import { Answer, Question } from 'types';
import { FormData } from 'components/SectionLandingPage/Hero';
import { colors, fontSize } from 'core/base/Token';
import DirectCalendar from 'core/base/Calendar/DirectCalendar';

type Props = {
  loading: boolean;
  question?: Question;
  methods?: UseFieldArrayReturn<FormData>;
  index?: number;
  onSubmit?: () => void;
  choiceLabel?: string;
  preferencePage?: boolean;
  answer?: Answer;
  showSubmitButton?: boolean;
};

function Questionaire({
  loading,
  question,
  methods,
  index = 0,
  onSubmit,
  choiceLabel,
  preferencePage,
  answer,
  showSubmitButton = false,
}: Props) {
  const { t } = useTranslation();
  let QuestionContent;

  let minV = question?.add_ons?.range_number_min ?? MinRange;
  let maxV = question?.add_ons?.range_number_max ?? MaxRange;
  var initValueMin = minV;
  var initValueMax = maxV;

  if (answer && (methods?.fields[index]?.value?.length as number) === 0) {
    // set exists answer as default value
    methods?.update(index, {
      name: question?.title,
      value: answer.value,
      tag: question?.matching_tag,
      questionID: question?.id,
    });
  }

  const onSelectedDateCallback = useCallback(
    (value: string) => {
      methods?.update(index, {
        name: question?.title,
        value: value,
        tag: question?.matching_tag,
        questionID: question?.id,
      });
      onSubmit && onSubmit();
    },
    [index, methods, question?.id, question?.matching_tag, question?.title, onSubmit]
  );

  const onRangeSlideComplete = useCallback(
    (value: number | number[]) => {
      const answer = value as number[];
      methods?.update(index, {
        name: question?.title,
        value: '$' + answer[0] + '-' + '$' + answer[1],
        tag: question?.matching_tag,
        questionID: question?.id,
      });
    },
    [index, methods, question?.id, question?.matching_tag, question?.title]
  );

  switch (question?.type) {
    case 'DATE':
      QuestionContent = (
        <View style={styles.alignCenterContainer}>
          <DirectCalendar
            onChange={onSelectedDateCallback}
            customInitial={answer?.value}
            placeholder={t('placeholderCalendar')}
          />
        </View>
      );
      break;
    case 'RANGE_NUMBER':
      if (answer && answer?.value.split('-').length > 1) {
        var range = answer?.value.split('-');
        initValueMin = parseInt(range[0].replace('$', ''));
        initValueMax = parseInt(range[1].replace('$', ''));
      }
      QuestionContent = (
        <Container>
          <Slider
            trackColor={'rgba(28,43,79,0.3)'} // Token.colors.rynaBlue with opacity
            trackHighlightColor={Token.colors.blue}
            value={[initValueMin!, initValueMax!]}
            step={50}
            minimumValue={minV}
            maximumValue={maxV}
            trackStyle={{ height: 8, borderRadius: 50 }}
            onSlidingComplete={onRangeSlideComplete}
          />

          {!preferencePage && (
            <Button style={styles.submitButton} text={t('next')} onPress={onSubmit} textStyle={styles.buttonText} />
          )}
        </Container>
      );
      break;
    case 'CHOICES':
      QuestionContent = question.add_ons.choices?.map((choice, idx) => (
        <Input
          key={choice}
          editable={false}
          containerStyle={
            methods?.fields[index]?.value === choice || answer?.value === choice
              ? styles.selectedChoice
              : styles.containerTextInput
          }
          textInputStyle={styles.textInput}
          value={choice}
          rightLabel={
            choiceLabel ? (
              <Text
                variant="small"
                style={{
                  color: methods?.fields[index]?.value === choice ? colors.rynaBlack : colors.textDarkGrey,
                }}>
                {choiceLabel}
              </Text>
            ) : undefined
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
            !showSubmitButton && onSubmit && onSubmit();
          }}
        />
      ));
      break;
  }

  const setChoice = useRef('');

  // set default value
  useEffect(() => {
    if (setChoice.current === question?.type) {
      return;
    }
    switch (question?.type) {
      case 'RANGE_NUMBER':
        onRangeSlideComplete([initValueMin!, initValueMax!]);
        break;
      default:
        break;
    }
    setChoice.current = question?.type ?? '';
  }, [maxV, minV, initValueMin, initValueMax, onRangeSlideComplete, onSelectedDateCallback, question?.type]);

  return (
    <View style={styles.container}>
      {loading ? (
        <LoadingIndicator />
      ) : (
        <>
          {question?.title && (
            <Text variant="header-2" ink="primary" style={styles.title}>
              {question?.title}
            </Text>
          )}
          <Text variant="caption" style={styles.subtitle}>
            {question?.question_text}
          </Text>
          {QuestionContent}
        </>
      )}

      {showSubmitButton && !preferencePage && (
        <Button
          style={styles.submitButton}
          text={t('submitQuestionButton')}
          onPress={onSubmit}
          textStyle={styles.buttonText}
        />
      )}
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
