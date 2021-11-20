import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useQuery } from 'react-query';
import { useFieldArray, useForm } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
// @ts-ignore
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { Token, fetcher } from 'core';
import { Text } from 'core/base';
import { QUERY_KEYS } from 'core/constants';
import { Answer, Question, QuestionState, ResponseItem } from 'types';
import SideBar from '../SideBar';
import PreferenceQuestion from './PreferenceQuestion';

type PreferenceQuestionState = {
  states: QuestionState[];
};

type Props = {
  answers?: Answer[];
};

export default function PreferenceContent({ answers }: Props) {
  const [stateIndex, setStateIndex] = React.useState(0);
  const { data, isLoading } = useQuery(QUERY_KEYS.QUESTION_ALL, async () => {
    const res = await fetcher<ResponseItem<Question>>({
      method: 'GET',
      url: '/question',
    });
    return res;
  });
  const questions = !isLoading ? data?.data || [] : [];
  const { control } = useForm<PreferenceQuestionState>();
  const fieldsArrayMethods = useFieldArray<PreferenceQuestionState, 'states'>({
    control,
    name: 'states',
  });

  const qMap = new Map<string, Question[]>(getQuestionMap(questions));
  const sideBarMenu = new Array<{
    name: string;
    label: string;
    IconRight?: React.ReactNode;
  }>();
  const onChangeActiveSidebar = (name: string) => {
    const questionGroup = qMap.get(name);

    if (questionGroup === undefined) {
      return;
    }

    setStateIndex(questions.indexOf(questionGroup[0]));
  };

  qMap.forEach((value: Question[], key: string) => {
    var result = fieldsArrayMethods.fields.filter(function (o1) {
      return value.some(function (o2) {
        return o1.questionID === o2.id;
      });
    });

    sideBarMenu.push({
      name: key,
      label: key,
      IconRight:
        result.length === value.length ? (
          <Icon name="check-circle" size={20} color={Token.colors.rynaBlue} />
        ) : (
          <Text variant="button" ink="primary">
            {result.length + `/` + value.length}
          </Text>
        ),
    });
  });

  return (
    <View style={styles.contentWrapper}>
      <SideBar menus={sideBarMenu} style={styles.sidebar} onPress={onChangeActiveSidebar} />
      <View style={styles.content}>
        <PreferenceQuestion
          stateIndex={stateIndex}
          stateIndexSetter={setStateIndex}
          questions={questions}
          answers={answers}
          methods={fieldsArrayMethods}
        />
      </View>
      <DevTool control={control} />
    </View>
  );
}

function getQuestionMap(questions?: Question[]): Map<string, Question[]> {
  return (questions || []).reduce((prev, curr) => {
    if (prev.has(curr.category)) {
      prev.get(curr.category)?.push(curr);
    } else {
      prev.set(curr.category, [curr]);
    }

    return prev;
  }, new Map<string, Question[]>());
}

const styles = StyleSheet.create({
  contentWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Token.spacing.xxl,
    alignItems: 'flex-start',
    marginVertical: Token.spacing.xxl,
  },
  sidebar: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: '28%',
  },
  content: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: '68%',
  },
});
