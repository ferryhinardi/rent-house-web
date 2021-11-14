import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { View, StyleSheet } from 'react-native';
import { Text, ContainerDesktop } from 'core/base';
import { Token, fetcher } from 'core';
import { useQuery } from 'react-query';
import ScheduleTourForm from './ScheduleTourForm';
import { House } from 'types';
import config from 'config';
import { QUERY_KEYS } from 'core/constants';
import PreviewImageButtonModal from './PreviewImageButtonModal';

type Props = {
  allowApplicant?: boolean;
};

export default function HomeRecommendationHeaderSection(props: Props) {
  const router = useRouter();
  const { homeID } = router.query;
  const { data } = useQuery(
    [QUERY_KEYS.HOME_DETAIL, homeID],
    async () => {
      const res = await fetcher<House>({
        method: 'GET',
        url: `/house/${homeID}`,
      });
      return res;
    },
    { enabled: homeID !== undefined }
  );
  return (
    <ContainerDesktop style={styles.container}>
      <View style={styles.homeInfoContainer}>
        <Text variant="headline-1" ink="dark">
          {data?.name}
        </Text>
        <Text variant="caption" style={styles.homeInfoDescription}>
          {data?.description}
        </Text>
        <ScheduleTourForm
          house_id={data?.id as number}
          external_url={data?.external_url}
          allowApplicant={props.allowApplicant}
        />
      </View>

      <View>
        <View>
          <Image
            src={`${config.imageHost}/${data?.lead_media}`}
            blurDataURL={`${config.imageHost}/${data?.lead_media}`}
            placeholder="blur"
            alt={`galery-1`}
            className="galery-recommendation"
            width={744}
            height={378}
            objectFit="cover"
          />
          <PreviewImageButtonModal
            text={'Show All Photos'}
            images={[data?.lead_media!, ...(data?.galleries || [])]}
            style={styles.seeAllBtn}
          />
        </View>
        <View style={styles.imageCollections}>
          {(data?.galleries || []).map((item, i) => (
            <Image
              key={i}
              src={`${config.imageHost}/${item}`}
              blurDataURL={`${config.imageHost}/${item}`}
              placeholder="blur"
              alt={`galery-${i + 1}`}
              className="galery-recommendation"
              width={243}
              height={205}
              objectFit="cover"
            />
          ))}
        </View>
      </View>
      <style jsx global>{`
        .galery-recommendation {
          border-radius: 16px;
        }
      `}</style>
    </ContainerDesktop>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: Token.spacing.xxxxl,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Token.spacing.xxxxl,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  homeInfoContainer: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: '30%',
  },
  homeInfoDescription: {
    marginTop: Token.spacing.l,
  },
  imageCollections: {
    marginTop: 38,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: '66%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Token.spacing.l,
  },
  seeAllBtn: { position: 'absolute', right: 16, bottom: 16 },
});
