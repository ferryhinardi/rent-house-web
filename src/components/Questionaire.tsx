import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Token } from 'core';
import { Text, Input, CalendarInput, LoadingIndicator } from 'core/base';
import { Question, AddOnsChoices } from 'types';
import Slider from './Slider';
import Container, {
  SliderConsumer,
  MinRange,
  MaxRange,
} from './Slider/Container';

type Props = {
  loading: boolean;
  question?: Question;
  onSubmit?: () => void;
};

function Questionaire(props: Props) {
  const { t } = useTranslation();
  let QuestionContent;

  switch (props.question?.type) {
    case 'date':
      QuestionContent = (
        <CalendarInput placeholder={t('placeholderCalendar')} />
      );
      break;
    case 'range_number':
      QuestionContent = (
        <Container>
          <SliderConsumer>
            {({ min = 0, max = 0 }) => (
              <Slider
                trackColor={'rgba(28,43,79,0.3)'} // Token.colors.blue with opacity
                trackHighlightColor={Token.colors.blue}
                value={[min, max]}
                step={50}
                minimumValue={MinRange}
                maximumValue={MaxRange}
                trackStyle={{ height: 8, borderRadius: 50 }}
                onValueChange={(value: number | number[]) =>
                  console.log('onValueChange', value)
                }
                onSlidingStart={(value: number | number[]) =>
                  console.log('onSlidingStart', value)
                }
                onSlidingComplete={(value: number | number[]) =>
                  console.log('onSlidingComplete', value)
                }
              />
            )}
          </SliderConsumer>
        </Container>
      );
      break;
    case 'choices':
      QuestionContent = (props.question.add_ons as AddOnsChoices).choices.map(
        (choice) => (
          <Input
            key={choice}
            editable={false}
            containerStyle={styles.containerTextInput}
            textInputStyle={styles.textInput}
            value={choice}
            iconRight={
              <Text variant="tiny" ink="caption">
                {'Available'}
              </Text>
            }
          />
        )
      );
      break;
  }

  return (
    <View style={styles.container}>
      {props.loading ? (
        <LoadingIndicator />
      ) : (
        <>
          <Text variant="huge" style={styles.title}>
            {props.question?.title}
          </Text>
          <Text variant="big" style={styles.subtitle}>
            {props.question?.question_text}
          </Text>

          {QuestionContent}

          <Pressable style={styles.submitButton} onPress={props.onSubmit}>
            <Text ink="light">{t('submitQuestionButton')}</Text>
          </Pressable>
        </>
      )}
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
