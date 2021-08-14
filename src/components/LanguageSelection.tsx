import React from 'react';
import Select, { components, Styles, OptionTypeBase } from 'react-select';
import makeAnimated from 'react-select/animated';
import { languageOptions as options } from 'core/constants';

const animatedComponents = makeAnimated({
  Menu: CustomMenu,
});
const customStyles: Styles<OptionTypeBase, false> = {
  container: (styles) => ({ ...styles, minWidth: 120 }),
  control: (styles) => ({
    ...styles,
    borderWidth: 0,
    borderColor: 'unset',
    boxShadow: 'none',
  }),
  menu: (styles) => ({ ...styles, zIndex: 1 }),
};

function LanguageSelection() {
  return (
    <Select
      defaultValue={options[0]}
      components={animatedComponents}
      options={options}
      styles={customStyles}
    />
  );
}

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

export default LanguageSelection;
