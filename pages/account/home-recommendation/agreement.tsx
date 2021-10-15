import React from 'react';
import {
  Head,
  HeaderMenu,
  Breadcrumb,
  HomeDetailAgreement,
  Footer,
} from 'components';
import { ContainerDesktop } from 'core/base';

export default function AgreementPage() {
  return (
    <div>
      <Head />
      <HeaderMenu />
      <ContainerDesktop>
        <Breadcrumb />
        <HomeDetailAgreement />
      </ContainerDesktop>
      <Footer />
    </div>
  );
}
