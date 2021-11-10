import { useRef, useCallback } from 'react';
import { useFormContext, UseFormRegisterReturn } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Handler } from 'core/base/FileUploader';

export default function useRegisterDynamicForm(fieldName: string) {
  const fieldFormRef = useRef<UseFormRegisterReturn>();
  const { t } = useTranslation();
  const { register } = useFormContext();
  const inputRef = useRef<Handler | null>();
  const setRef = (ref: Handler | null) => {
    inputRef.current = ref;
    fieldFormRef.current?.ref(ref);
  };
  const setFieldFormRegistery = useCallback(() => {
    fieldFormRef.current = {
      ...register(fieldName, {
        required: t(`${fieldName}.required`) as string,
      }),
      ref: setRef,
    };
  }, [fieldName, register, t]);
  return { setFieldFormRegistery, inputRef };
}
