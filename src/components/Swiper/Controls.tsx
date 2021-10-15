/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext, createContext } from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';

import { Button } from 'core/base';
import { Token } from 'core';
import Badge from './Badge';

type CellPosition =
  | 'top-left'
  | 'top'
  | 'top-right'
  | 'left'
  | 'center'
  | 'right'
  | 'bottom-left'
  | 'bottom'
  | 'bottom-right';

type Props = Partial<{
  cellsStyle: { [key: string]: ViewStyle };
  cellsContent: { [key: string]: React.ReactNode };

  dotsPos: CellPosition;
  prevPos: CellPosition;
  nextPos: CellPosition;
  prevTitle: string;
  nextTitle: string;

  dotsTouchable: boolean;
  dotsWrapperStyle: StyleProp<ViewStyle>;
  dotActiveStyle: StyleProp<ViewStyle>;
  prevTitleStyle: StyleProp<ViewStyle>;
  nextTitleStyle: StyleProp<TextStyle>;

  dotProps: React.ComponentProps<typeof Badge>;
  DotComponent: React.FC<{
    index: number;
    isActive: boolean;
    onPress?: () => void;
  }>;
  PrevComponent: React.FC<{
    type: 'prev';
    text: string;
    textStyle: TextStyle;
    onPress: () => void;
  }>;
  NextComponent: React.FC<{
    type: 'next';
    text: string;
    textStyle: TextStyle;
    onPress: () => void;
  }>;

  firstPrevElement: () => React.ReactNode;
  lastNextElement: () => React.ReactNode;

  vertical: boolean;
  count: number;
  activeIndex: number;
  isFirst: boolean;
  isLast: boolean;
  goToPrev: (index: number) => void;
  goToNext: (index: number) => void;
  goTo: (index: number) => void;
}>;

const ControlContext = createContext<Props>({});

function useControl() {
  const value = useContext(ControlContext);
  if (!value) {
    throw new Error(`useControl must be used within a ControlContext.Provider`);
  }
  return value;
}

export default function Controls({
  prevTitle = 'Prev',
  nextTitle = 'Next',
  vertical,
  count,
  activeIndex,
  cellsStyle,
  cellsContent,
  dotsPos,
  prevPos,
  nextPos,
  dotsTouchable,
  dotsWrapperStyle,
  DotComponent,
  isFirst,
  isLast,
  PrevComponent,
  prevTitleStyle,
  NextComponent,
  nextTitleStyle,
  goToPrev,
  goToNext,
  firstPrevElement,
  lastNextElement,
  goTo,
}: Props) {
  return (
    <ControlContext.Provider
      value={{
        cellsStyle,
        cellsContent,
        dotsPos,
        prevPos,
        nextPos,
        vertical,
        count,
        activeIndex,
        dotsTouchable,
        dotsWrapperStyle,
        DotComponent,
        goTo,
        goToPrev,
        isFirst,
        prevTitle,
        firstPrevElement,
        prevTitleStyle,
        PrevComponent,
        goToNext,
        isLast,
        nextTitle,
        lastNextElement,
        nextTitleStyle,
        NextComponent,
      }}
    >
      <React.Fragment>
        <Row rowAlign="top" />
        <Row />
        <Row rowAlign="bottom" />
      </React.Fragment>
    </ControlContext.Provider>
  );
}

function Row({ rowAlign }: { rowAlign?: 'top' | 'bottom' }) {
  const row = [
    `${!rowAlign ? '' : rowAlign + '-'}left`,
    rowAlign || 'center',
    `${!rowAlign ? '' : rowAlign + '-'}right`,
  ];
  const alignItems = ['flex-start', 'center', 'flex-end'];

  return (
    <View style={styles.row}>
      {row.map((name, index) => (
        <View
          key={name}
          style={customStyles.spaceHolder(
            alignItems[index] as ViewStyle['alignItems']
          )}
        >
          <Cell name={name as CellPosition} />
        </View>
      ))}
    </View>
  );
}

function Cell({ name }: { name: CellPosition }) {
  const {
    cellsStyle,
    cellsContent,
    dotsPos,
    prevPos,
    nextPos,
    vertical,
    count,
    activeIndex,
    dotsTouchable,
    DotComponent,
    goTo,
    goToPrev,
    isFirst,
    prevTitle,
    firstPrevElement,
    prevTitleStyle,
    PrevComponent,
    goToNext,
    isLast,
    nextTitle,
    lastNextElement,
    nextTitleStyle,
    NextComponent,
  } = useControl();

  return (
    <View style={StyleSheet.flatten([styles.cell, cellsStyle?.[name]])}>
      {_getPos(Boolean(vertical), dotsPos!, 'bottom', 'right') === name &&
        renderDots({
          vertical,
          count,
          activeIndex,
          dotsTouchable,
          DotComponent,
          goTo,
        })}
      {_getPos(Boolean(vertical), prevPos!, 'bottom-left', 'top-right') ===
        name &&
        renderPrev({
          goToPrev,
          isFirst,
          prevTitle,
          firstPrevElement,
          prevTitleStyle,
          PrevComponent,
        })}
      {_getPos(Boolean(vertical), nextPos!, 'bottom-right') === name &&
        renderNext({
          goToNext,
          isLast,
          nextTitle,
          lastNextElement,
          nextTitleStyle,
          NextComponent,
        })}
      {cellsContent?.[name] && renderNode(Text, cellsContent[name])}
    </View>
  );
}

function Dot({
  isActive,
  onPress,
  dotProps,
  dotActiveStyle,
}: {
  isActive: boolean;
  onPress?: () => void;
  dotProps?: Props['dotProps'];
  dotActiveStyle?: Props['dotActiveStyle'];
}) {
  const { containerStyle, badgeStyle, ...others } = dotProps || {};
  return (
    <Badge
      containerStyle={StyleSheet.flatten([
        styles.dotsItemContainer,
        containerStyle,
      ])}
      badgeStyle={StyleSheet.flatten([
        customStyles.dotsItem(isActive),
        badgeStyle,
        isActive && dotActiveStyle,
      ])}
      onPress={onPress}
      {...others}
    />
  );
}

const renderDots = ({
  vertical = false,
  count,
  activeIndex,
  dotsTouchable,
  dotsWrapperStyle,
  DotComponent = Dot,
  goTo,
}: Props) => {
  return (
    <View
      style={StyleSheet.flatten([
        customStyles.dotsWrapper(vertical),
        dotsWrapperStyle,
      ])}
    >
      {Array(count)
        .fill(count)
        .map((_, index) => (
          <DotComponent
            key={index}
            index={index}
            isActive={activeIndex === index}
            onPress={!dotsTouchable ? undefined : () => goTo?.(index)}
          />
        ))}
    </View>
  );
};
const renderPrev = ({
  goToPrev,
  isFirst,
  prevTitle,
  firstPrevElement,
  prevTitleStyle,
  PrevComponent = (props) => <Button {...props} variant="empty" />,
}: Props) => {
  if (isFirst) {
    return renderNode(Text, firstPrevElement);
  }
  return (
    // @ts-ignore
    <PrevComponent
      type="prev"
      text={prevTitle as string}
      textStyle={prevTitleStyle as TextStyle}
      onPress={goToPrev as () => void}
    />
  );
};
const renderNext = ({
  goToNext,
  isLast,
  nextTitle,
  lastNextElement,
  nextTitleStyle,
  // @ts-ignore
  NextComponent = (props) => <Button {...props} variant="empty" />,
}: Props) => {
  if (isLast) {
    return renderNode(Text, lastNextElement);
  }
  return (
    // @ts-ignore
    <NextComponent
      type="next"
      text={nextTitle as string}
      textStyle={nextTitleStyle as TextStyle}
      onPress={goToNext as () => void}
    />
  );
};

const renderNode = (
  Component: typeof React.PureComponent,
  content: any,
  defaultProps?: any
) => {
  if (content == null || content === false) {
    return null;
  }
  if (React.isValidElement(content)) {
    return content;
  }
  if (typeof content === 'function') {
    return content();
  }
  // Just in case
  if (content === true) {
    return <Component {...defaultProps} />;
  }
  if (typeof content === 'string' || typeof content === 'number') {
    return <Component {...defaultProps}>{content}</Component>;
  }
  return <Component {...defaultProps} {...content} />;
};

function _getPos(
  vertical: boolean,
  position: CellPosition,
  horizontalDefault: CellPosition,
  verticalDefault?: CellPosition
) {
  return !position
    ? null
    : position
    ? position
    : verticalDefault && vertical
    ? verticalDefault
    : horizontalDefault;
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    height: 0,
    alignItems: 'center',
    margin: 20,
  },
  cell: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
  },
  dotsItemContainer: {
    margin: 3,
  },
});

const customStyles = {
  spaceHolder: (alignItems: ViewStyle['alignItems']): ViewStyle => ({
    height: 0,
    flex: 1,
    alignItems,
    justifyContent: 'center',
  }),
  dotsWrapper: (vertical: boolean): ViewStyle => ({
    flexDirection: vertical ? 'column' : 'row',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 1,
    minHeight: 1,
  }),
  dotsItem: (isActive: boolean): ViewStyle => ({
    backgroundColor: isActive ? Token.colors.rynaBlue : Token.colors.rynaGray,
    borderColor: 'transparent',
  }),
};
