import HeadSEO from 'components/HeadSEO';
import Header from 'components/Header';
import Hero from 'components/Hero';
import Perks from 'components/Perks';

export default function Home() {
  return (
    <div>
      <HeadSEO />
      <Header />
      <Hero />
      <Perks />
    </div>
  )
}
