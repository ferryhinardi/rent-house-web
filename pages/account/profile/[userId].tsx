import React from 'react';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';

import { Head, HeaderMenu, RoommateProfile, Footer } from 'components';
import { fetcher } from 'core';

import { User } from 'types';
import { QUERY_KEYS } from 'core/constants';

export default function ProfileDetail() {
  const router = useRouter();
  const { query } = router;

  const { data } = useQuery<User>(
    QUERY_KEYS.USER,
    async () => {
      const res = await fetcher<User>({
        method: 'GET',
        url: `/user/${query.userId}`,
      });
      return res;
    },
    { enabled: query.userId !== undefined }
  );

  return (
    <div>
      <Head />
      <HeaderMenu />
      <RoommateProfile user={data} />
      <Footer />
    </div>
  );
}
