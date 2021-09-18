import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
// @ts-ignore
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import {
  Head,
  HeaderMenu,
  HeaderNavigation,
  SideBar,
  PreferenceContent,
  Footer,
} from 'components';
import { fetcher, Token } from 'core';
import { ContainerDesktop, Text } from 'core/base';
import { useQuery } from 'react-query';
import { QUERY_KEYS } from 'core/constants';
import { Question, ResponseItem } from 'types';
import { useFieldArray, useForm } from 'react-hook-form';

export type QuestionState = {
  name: string;
  value?: string;
  questionID?: number;
};

export type PreferenceQuestionState = {
  states: QuestionState[];
};

export default function Preference() {
  const { t } = useTranslation();

  const [stateIndex, setStateIndex] = React.useState(0);

  const { data, isLoading } = useQuery(
    QUERY_KEYS.QUESTION_USER_PREFERENCES,
    async () => {
      const res = await fetcher<ResponseItem<Question>>({
        method: 'GET',
        url: '/question?section=user_preferences',
      });
      return res;
    }
  );

  let qMap = new Map<string, Question[]>();
  data?.data.map((e) => {
    if (qMap.has(e.category)) {
      var newMap = qMap.get(e.category) as Question[];
      newMap?.push(e);
      qMap.set(e.category, newMap);
    } else {
      var newMap = new Array<Question>();
      newMap.push(e);
      qMap.set(e.category, newMap);
    }
  });

  const questions = data?.data as Question[];

  const { control } = useForm<PreferenceQuestionState>();
  const fieldsArrayMethods = useFieldArray<PreferenceQuestionState, 'states'>({
    control,
    name: 'states',
  });

  let sideBarMenu = new Array<{
    name: string;
    label: string;
    IconRight?: React.ReactNode;
  }>();

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
          <Text variant="sidebar-menu" ink="primary">
            {result.length + `/` + value.length}
          </Text>
        ),
    });
  });

  const onChangeActiveSidebar = (name: string) => {
    var questionGroup = qMap.get(name);
    if (questionGroup === undefined) {
      return;
    }

    setStateIndex(questions.indexOf(questionGroup[0]));
  };

  if (isLoading) return <p>loading...</p>;

  return (
    <div>
      <Head />
      <HeaderMenu />
      <ContainerDesktop>
        <HeaderNavigation title={t('preference')} />
        <View style={styles.contentWrapper}>
          <SideBar
            menus={sideBarMenu}
            style={styles.sidebar}
            onPress={onChangeActiveSidebar}
          />
          <View style={styles.content}>
            <PreferenceContent
              stateIndex={stateIndex}
              stateIndexSetter={setStateIndex}
              questions={questions}
              methods={fieldsArrayMethods}
            />
          </View>
        </View>
      </ContainerDesktop>
      <Footer />
    </div>
  );
}

const styles = StyleSheet.create({
  contentWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Token.spacing.xxl,
    alignItems: 'flex-start',
    marginVertical: Token.spacing.xxl,
  },
  wrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
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
