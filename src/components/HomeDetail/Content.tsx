import React from 'react';
import { useRouter } from 'next/router';
import { routePaths } from 'routePaths';
import FormApply from './FormApply';

export default function HomeDetailContent() {
  const router = useRouter();
  return <FormApply onSubmit={() => router.push(routePaths.agreement)} />;
}
