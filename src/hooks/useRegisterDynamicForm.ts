import { useRef } from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Handler } from 'core/base/FileUploader';

export default function useRegisterDynamicForm(fieldName: string) {
  const { t } = useTranslation();
  const { register } = useFormContext();
  const inputRef = useRef<Handler | null>();
  const fieldForm = register(fieldName, {
    required: t(`${fieldName}.required`) as string,
  });
  const setRef = (ref: Handler | null) => {
    inputRef.current = ref;
    fieldForm.ref(ref);
  };
  return { ...fieldForm, ref: setRef, inputRef };
}
