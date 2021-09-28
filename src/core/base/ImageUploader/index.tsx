import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { View, StyleSheet } from 'react-native';
import { Token } from 'core';
import { Button } from 'core/base';

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  value?: string;
  actionLabel?: string;
};

const imagePlaceholder =
  'https://uploader-assets.s3.ap-south-1.amazonaws.com/codepen-default-placeholder.png';

export default function ImageUploader({
  value,
  actionLabel,
  ...restProps
}: Props) {
  const fileRef = useRef<HTMLInputElement>();
  const [image, setImage] = useState<string>();
  const val = image || value;
  const onFileChangeCapture = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
    }
  };
  // https://github.com/vercel/next.js/discussions/19732#discussioncomment-1136915
  const customImgLoader = ({ src }: { src: string }) => {
    return `${src}`;
  };
  const onPress = () => {
    fileRef.current?.click();
  };

  return (
    <View>
      <View
        style={{
          borderRadius: Token.border.radius.default,
          alignItems: 'flex-start',
        }}
      >
        <Image
          className="uploader-image"
          src={val || imagePlaceholder}
          blurDataURL={val || imagePlaceholder}
          loader={customImgLoader}
          placeholder="blur"
          width={240}
          height={240}
          alt="image"
        />
      </View>
      <input
        {...restProps}
        ref={fileRef as React.MutableRefObject<HTMLInputElement>}
        type="file"
        accept="image/*"
        style={{ visibility: 'hidden' }}
        onChangeCapture={onFileChangeCapture}
      />
      <Button
        variant="secondary"
        text={actionLabel}
        onPress={onPress}
        style={styles.uploadButton}
      />
      <style jsx global>{`
        .avatar-image {
          border-radius: 8px;
        }
      `}</style>
    </View>
  );
}

const styles = StyleSheet.create({
  uploadButton: {
    marginTop: Token.spacing.l,
    alignSelf: 'flex-start',
  },
});
