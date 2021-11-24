import { Dimensions } from 'react-native';
import { useMediaQuery } from 'react-responsive';
import tailwind from 'tailwind-rn';
// import tailwind from 'core/tailwind';

const window = Dimensions.get('window');
const widthMap = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
};

function useIsAtLeastSm() {
  return useMediaQuery({ maxWidth: widthMap.sm }) || window.width < widthMap.sm;
}

function useIsAtLeastMd() {
  return useMediaQuery({ maxWidth: widthMap.md }) || window.width < widthMap.md;
}

function useIsAtLeastLg() {
  return useMediaQuery({ maxWidth: widthMap.lg }) || window.width < widthMap.lg;
}

function useIsAtLeastXl() {
  return useMediaQuery({ maxWidth: widthMap.xl }) || window.width < widthMap.xl;
}

export default function useTailwind() {
  const sm = useIsAtLeastSm();
  const md = useIsAtLeastMd();
  const lg = useIsAtLeastLg();
  const xl = useIsAtLeastXl();

  function tailwindResponsive(
    always: string,
    { sm, md, lg, xl }: { sm?: string; md?: string; lg?: string; xl?: string },
    {
      sm: applySm,
      md: applyMd,
      lg: applyLg,
      xl: applyXl,
    }: {
      sm?: boolean;
      md?: boolean;
      lg?: boolean;
      xl?: boolean;
    }
  ) {
    return tailwind([always, applySm && sm, applyMd && md, applyLg && lg, applyXl && xl].filter(Boolean).join(' '));
  }

  return { tailwind, tailwindResponsive, sm, md, lg, xl };
}
