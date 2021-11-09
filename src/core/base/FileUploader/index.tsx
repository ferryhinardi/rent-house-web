import React, { useRef, useState, useImperativeHandle } from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import Image from 'next/image';
import { Token } from 'core';
import { Button, Text } from 'core/base';
import customImgLoader from 'core/utils/customImgLoader';
// @ts-ignore
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import assets from 'assets';
import config from 'config';

type ErrorStatus = 'LIMIT_SIZE';
type Props = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onError'> & {
  variant?: 'input' | 'image-preview';
  disabled?: boolean;
  value?: string | File;
  actionLabel?: string;
  maxFileSize?: number;
  onFileChange?: () => void;
  onError?: (error: { status: string | ErrorStatus; message?: string }) => void;
};
export type Handler = {
  reset: (value?: string) => void;
};

export default React.forwardRef(function FileUploader(
  {
    value,
    variant = 'image-preview',
    disabled = false,
    actionLabel,
    maxFileSize,
    onFileChange,
    onError,
    ...restProps
  }: Props,
  ref: React.Ref<Handler>
) {
  const fileRef = useRef<HTMLInputElement>();
  const [file, setFile] = useState<string | File>();
  let val;
  const onFileChangeCapture = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      if (variant === 'image-preview') setFile(URL.createObjectURL(file));
      else setFile(file);

      onFileChange?.();

      if (maxFileSize && file.size > maxFileSize) {
        onError?.({ status: 'LIMIT_SIZE' });
      }
    }
  };
  const onPress = () => {
    if (!disabled) fileRef.current?.click();
  };

  if (variant === 'image-preview') {
    if (Boolean(file)) {
      val = file;
    } else if (Boolean(value)) {
      val = `${config.imageHost}/${value}`;
    }
  } else if (variant === 'input') {
    val = file || ({ name: value || '' } as File);
  }

  useImperativeHandle(
    ref,
    () => ({
      reset: (value?: string) => {
        setFile(value);
        onFileChange?.();
      },
    }),
    [setFile, onFileChange]
  );

  return (
    <View>
      {variant === 'input' ? (
        <Pressable disabled={disabled} onPress={onPress} style={styles.wrapperInputUploader}>
          <TextInput
            editable={false}
            placeholder={actionLabel}
            style={[styles.inputUploader, disabled ? styles.disabled : null]}
            value={(val as File)?.name}
            underlineColorAndroid="transparent"
          />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: Token.spacing.s,
              paddingVertical: Token.spacing.xxs,
              borderRadius: Token.border.radius.extra,
              backgroundColor: 'rgba(57, 59, 67, 0.1)',
            }}>
            <Icon name="upload" size={16} />
            <Text variant="small" ink="dark" style={{ marginLeft: Token.spacing.xs }}>
              {'Upload File (in PDF, jpeg/png)'}
            </Text>
          </View>
        </Pressable>
      ) : (
        <React.Fragment>
          <View
            style={{
              borderRadius: Token.border.radius.default,
              alignItems: 'flex-start',
            }}>
            <Image
              className="uploader-image"
              src={(val as string) || assets.placehoderImage}
              blurDataURL={(val as string) || assets.placehoderImage}
              loader={customImgLoader}
              placeholder="blur"
              width={240}
              height={240}
              alt="image"
            />
          </View>
          <Button
            variant="secondary"
            disabled={disabled}
            text={actionLabel}
            onPress={onPress}
            style={styles.uploadButton}
          />
          <style jsx global>{`
            .avatar-image {
              border-radius: 8px;
            }
          `}</style>
        </React.Fragment>
      )}

      <input
        {...restProps}
        ref={fileRef as React.MutableRefObject<HTMLInputElement>}
        type="file"
        aria-label="input-file-image"
        accept={variant === 'input' ? 'application/*' : 'image/*'}
        style={{ visibility: 'hidden' }}
        onChangeCapture={onFileChangeCapture}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  wrapperInputUploader: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: Token.border.width.thin,
    borderColor: Token.colors.blue,
    borderRadius: Token.border.radius.extra,
    paddingHorizontal: Token.spacing.l,
    paddingVertical: Token.spacing.m,
  },
  inputUploader: {
    flex: 1,
    fontSize: Token.typography.Baseline.fontSize,
    lineHeight: Token.typography.Baseline.lineHeight,
    outlineWidth: 0,
    outlineStyle: 'none',
    minWidth: 0,
  },
  uploadButton: {
    marginTop: Token.spacing.l,
    alignSelf: 'flex-start',
  },
  disabled: {
    backgroundColor: Token.colors.lightGrey,
  },
});
