import React from 'react';
import { SelectInput } from 'core/base';
import { languageOptions as options } from 'core/constants';

export default function LanguageSelection() {
  return <SelectInput defaultValue={options[0]} options={options} />;
}
