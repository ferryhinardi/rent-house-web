import React from 'react';
import ReactSelect, { Props as ReactSelectProps, components, Styles, OptionTypeBase } from 'react-select';
import makeAnimated from 'react-select/animated';
import { Token } from 'core';

type Variant = 'normal' | 'primary';
type Props = ReactSelectProps<OptionTypeBase, false> & {
  variant?: Variant;
};

export default function Select(props: Props) {
  return (
    <ReactSelect
      {...props}
      // @ts-ignore
      components={animatedComponents}
      styles={getCustomStyles(props.variant)}
    />
  );
}

const getCustomStyles = (variant?: Variant) => {
  let ControlStyle = {};
  switch (variant) {
    case 'primary':
      ControlStyle = {
        borderColor: Token.colors.rynaBlue,
        borderRadius: Token.border.radius.extra,
        zIndex: 1,
      };
      break;
    case 'normal':
    default:
      ControlStyle = {
        borderWidth: 0,
        borderColor: 'unset',
        boxShadow: 'none',
        zIndex: 1,
      };
      break;
  }

  return {
    container: (styles) => ({
      ...styles,
      minWidth: 120,
    }),
    control: (styles) => ({
      ...styles,
      ...ControlStyle,
    }),
    menu: (styles) => ({ ...styles, zIndex: 1 }),
    input: (styles) => ({ ...styles, paddingLeft: Token.spacing.xxs }),
    placeholder: (styles) => ({ ...styles, paddingLeft: Token.spacing.xxs }),
  } as Styles<OptionTypeBase, false>;
};

const animatedComponents = makeAnimated({
  Menu: CustomMenu,
});

const SelectMenu = components.Menu;
function CustomMenu(props: React.ComponentProps<typeof SelectMenu>) {
  return (
    <>
      <SelectMenu {...props} className="react-select-menu" />
      <style jsx global>{`
        @keyframes fadeIn {
          0% {
            opacity: 0;
            transform: translateY(1rem);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeOut {
          0% {
            opacity: 1;
            transform: translateY(0);
          }
          100% {
            opacity: 0;
            transform: translateY(1rem);
          }
        }

        .react-select-menu {
          animation: fadeIn 0.1s ease-in;
        }

        .react-select-menu--close {
          animation: fadeOut 0.1s ease-out;
        }
      `}</style>
    </>
  );
}
