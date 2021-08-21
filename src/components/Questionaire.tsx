import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Token } from 'core';
import { Text, Input, LoadingIndicator } from 'core/base';
import { Question } from 'types';
import Calendar from './Calendar';
import Slider from './Slider';

type Props = {
  loading: boolean,
  question?: Question;
  onSubmit?: () => void;
};

function Questionaire(props: Props) {
  const { t } = useTranslation();
  console.log('question', props.question);
  let QuestionContent;

  switch(props.question?.type) {
  case 'date':
    QuestionContent = <Calendar />;
    break;
  case 'range_number':
    QuestionContent = <Slider value={[0, 100]} />;
    break;
  case 'choices':
    QuestionContent = <Input editable={false} containerStyle={styles.textInput} />;
    break;
  }

  return (
    <View style={styles.container}>
      {props.loading ? (
        <LoadingIndicator />
      ) : (
        <>
          <Text variant="huge" style={styles.title}>{props.question?.title}</Text>
          <Text variant="big" style={styles.subtitle}>{props.question?.question_text}</Text>

          {QuestionContent}

          <Pressable style={styles.submitButton} onPress={props.onSubmit}>
            <Text ink='light'>{t('submitQuestionButton')}</Text>
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
    alignSelf: 'flex-start'
  },
  title: {
    lineHeight: 36,
  },
  subtitle: {
    lineHeight: 28,
    marginVertical: Token.spacing.s,
  },
  textInput: {
    paddingHorizontal: Token.spacing.m,
    paddingVertical: Token.spacing.s,
    marginTop: Token.spacing.l,
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
